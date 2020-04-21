const searchCSV = (keys, values, data) =>{
    let column = []
    console.log(keys, values)
    
    //check for empty parameters and throw them away 
    for(let i = 0; i < values.length;i++){
        if(values[i]=== ''){
            
            //remove both the key and value
            values.splice(i,1)
            keys.splice(i,1)
        }
    }
    
    //find what the key is referencing in our dataset
    for(let i = 0; i < keys.length; i++){
        //console.log("outer", keys[i])
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
    }
    return ret
}
exports.searchCSV = searchCSV