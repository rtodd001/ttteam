const searchCSV = (keys, values, mapTable, rawData) =>{
    //edge case for empty data structure
    if(rawData.length === 0){
        return []
    }
    //create our return array
    let ret = []

    //the number of columns in our data set
    let columns = 15
    
    //check for empty parameters and throw them away 
    for(let i = 0; i < values.length; i++){
        if( '' + values[i] === ''){
            //remove both the key and value
            values.splice(i,1)
            keys.splice(i,1)
            // /i--
        }
    }
    let num = keys.length
    console.log(keys, values)
    let indices = []

    //iterate over the columns first
    for(let i = 0; i < keys.length; i++){
        //get the map assosciated with the key/column
        let tempMap = mapTable.get(keys[i])
        //find the value we are searching for
        if(tempMap.has(values[i])){
            //an array of array gets stored here of all indices
            //console.log("Val:", tempMap.get(values[i]))
            indices = indices.concat(tempMap.get(values[i]))
        }
    }
    //sort all the numbers
    indices.sort(function(a,b){
        return a - b 
    });
    console.log("Index: ", indices)
    let prev = -1
    let counter = 0
    //iterate throught the indices to see all the matching ones
    for(let i = 0; i < indices.length; i++){
        if(indices[i] === prev){
            counter++
            if(counter === keys.length - 1){
                //console.log("index: ", indices[i])
                counter = 0
                let extractedRow = []
                for(let k = 0; k < columns; k++){
                    extractedRow.push(rawData[indices[i]* columns + k])
                }
                ret.push(extractedRow)
            }
        }
        else{
            counter = 0
        }
        prev = indices[i]
    }
    if(indices.length === 1){
        let extractedRow = []
        for(let k = 0; k < columns; k++){
            extractedRow.push(rawData[indices[0]* columns + k])
        }
        ret.push(extractedRow)
    }
    return ret
}
exports.searchCSV = searchCSV