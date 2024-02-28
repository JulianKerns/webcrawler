function normalizeURL(url){
    try{
    const adress = new URL(url)
    return adress.origin +'/path'

    }catch(TypeError){
    return 'Not a valid URL'
    }
}



module.exports = {
    normalizeURL
}