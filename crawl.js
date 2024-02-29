function normalizeURL(url){
    try{
    const adress = new URL(url)
    let fullPath = `${adress.hostname}${adress.pathname}`
    if(fullPath.length > 0 && fullPath.slice(-1) === '/'){
         fullPath = fullPath.slice(0,-1)
    }
    return fullPath
    }catch(TypeError){
        return 'Not a valid URL'
    }
}

function getURLsfromHTML(htmlBody, baseUrl){
    const {JSDOM} = require('jsdom')
    const dom = new JSDOM(htmlBody)
    const linkList = []
    const webpageUrl = dom.window.document.querySelectorAll("a")
    for(const item of webpageUrl){
        let url = item.getAttribute('href')
        if(url.slice(0,1) === '/'){
            try{
            url = baseUrl + url
            let urlvalid = new URL(url).href
            linkList.push(url) 
        }catch(err){
            console.log(`${err.message} : ${url}`)
        }
        }else{
            try{
                let urlvalid = new URL(url).href
                linkList.push(url)
            }catch(err){
                console.log(`${err.message} : ${url}`)
            }
           
        }
        
    }
    return linkList
    }


async function crawlPage(rootUrl, currUrl, pages){
    const baseDomain = new URL(rootUrl).hostname
    const currDomain = new URL(currUrl).hostname
   
    
    if(baseDomain !== currDomain){
        return pages
    }

    const normCurrUrl = normalizeURL(currUrl)

    if(pages[normCurrUrl]){
        pages[normCurrUrl]++
        return pages

    }else if(!pages[normCurrUrl] && currUrl === rootUrl){
        pages[normCurrUrl] = 0
        

    }else if(!pages[normCurrUrl]){
        pages[normCurrUrl] = 1
    }

    let response = null
    let HTMLbody= null
    try{
     response = await fetch(currUrl,{
        method : 'GET',
        mode : 'cors',
        
    })}
    catch(err){
        return `An Error occured during fetching ${err.message}`
    } 
    try{
    if(response.status < 400 && response.headers.get('content-type').includes('text/html')){
         HTMLbody= await response.text()
         
         
    }
    else{
        console.log('Error: Could not retrive HTML_Data')
    }
    }catch(err){
        console.log(`Error occured: ${err.message}`)
    }
    const listOfPageUrls = getURLsfromHTML(HTMLbody,rootUrl)
   
   for(const pageUrl of listOfPageUrls){
    console.log(`Crawling webpage: ${pageUrl}`)
    const crawling = await crawlPage(rootUrl,pageUrl,pages)
   
     
   }
  
   return pages
    

}





module.exports = {
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}