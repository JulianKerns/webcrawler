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
   

module.exports = {
    normalizeURL,
    getURLsfromHTML
}