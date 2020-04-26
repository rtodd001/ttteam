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
        //console.log("tempMap:", tempMap)
        //find the value we are searching for
        if(tempMap.has(values[i])){
            //an array of array gets stored here of all indices
            //console.log("Val:", tempMap.get(values[i]))
            indices = indices.concat(tempMap.get(values[i]))
            //indices.push(tempMap.get(values[i]))
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
                console.log("index: ", indices[i])
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
        
        //let distance = indices.lastIndexOf(indices[i]) - indices.indexOf(indices[i])
        //console.log(distance)
        /* if(distance === keys.length - 1){
            let extractedRow = []
            for(let k = 0; k < columns; k++){
                extractedRow.push(rawData[indices[i]* columns + k])
            }
            ret.push(extractedRow)
            i+=keys.length
        } */
    }
    console.log(ret)
    



   /*  //find what the key is referencing in our dataset
    for(let i = 0; i < keys.length; i++){
        console.log("outer", keys[i])
        for(let j = 0; j < 15; j++){
            //console.log("column name", data[0][j])
            //console.log("key name", keys[i])
            if("" + data[0][j] === "" + keys[i]){
                //console.log("inner", keys[i])
                
                //this store the column index of our key 
                column.push(j)
            }
        }
    }
    console.log("column",column, "values", values)
    let ret = []
    
    //Search the dataset
    for(let i = 1; i < data.length; i++){
        let flag = true
        //console.log(column.length)
        
        //iterate over each key
        for(let k = 0; k < column.length; k++){
            //console.log("k",k)
            //console.log("i:",i,":",data[i][column[k]],":", values[k])
            
            //if one of the search criteria is not met, then stop and go
            //to the next row
            if("" + data[i][column[k]] !== ""+ values[k]){
                //console.log("i:",i,":",data[i][column[k]],":", values[k])
                flag = false
                break
            }
            //console.log(column[k])
            //console.log(data[i][column[k]])

        }
        //If it matches for all keys, package that option
        if(Boolean(flag)){
            ret.push(data[i])
            //console.log(data[i])
        }
    } */
    return ret
}
exports.searchCSV = searchCSV