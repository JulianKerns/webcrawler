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
        if(url[0] === '/'){
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

async function crawlPage(currUrl){
    let response = null
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
        const HTMLbody = await response.text()
        console.log(`${HTMLbody}`)
    }
    else{
        console.log('Error: Could not retrive Server-Data')
    }
    }catch(err){
        console.log(`Error occured: ${err.message}`)
    }

}




module.exports = {
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}