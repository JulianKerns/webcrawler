const{crawlPage} = require('./crawl.js')

function main(){
    const {argv} = require('node:process')
    if(argv.length < 3 ){
        console.log('Error: No processable arguments given')
    }else if( argv.length > 3){
        console.log('Error: To many processable arguments given')

    }else{
        console.log(`Commence crawling the website at its root: ${argv[2]}`)
        const crawl = crawlPage(argv[2])
        return crawl
    }

}
main()