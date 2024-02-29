
function printReport(pages){
    console.log(`-----------------------
Starting the report
-----------------------`
    
    )
    let sortedObject = sortingNumbers(pages)
    for(const [url, count] of Object.entries(sortedObject)){
        console.log(`Found ${count} internal links to ${url}`)
    }
    console.log(`-----------------------
Report finished
-----------------------`
    )
}
function sortingNumbers(pages){
    let array = []
    for(const [key, value] of Object.entries(pages)){
        array.push([key,value])
    }
   
    let sorted = array.sort((a,b) => b[1]-a[1])
   
    let sortedObj = {}
    sorted.forEach(function(sorted){
    sortedObj[sorted[0]]= sorted[1]
   
   })
   return sortedObj
}

module.exports={
    printReport
}
 
