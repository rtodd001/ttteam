const searchCSV = (keys, values, data) =>{
    let column = []
    //console.log(keys, values)
    for(let i = 0; i < keys.length; i++){
        //console.log("outer", keys[i])
        for(let j = 0; j < 15; j++){
            //console.log("column name", data[0][j])
            //console.log("key name", keys[i])
            if("" + data[0][j] === "" + keys[i]){
                console.log("inner", keys[i])
                column.push(j)
            }
        }
    }
    console.log("column",column, "values", values)
    let ret = []
    for(let i = 1; i < data.length; i++){
        let flag = true
        //console.log(column.length)
        
        for(let k = 0; k < column.length; k++){
            //console.log("k",k)
            //console.log("i:",i,":",data[i][column[k]],":", values[k])
            if("" + data[i][column[k]] !== ""+ values[k]){
                //console.log("i:",i,":",data[i][column[k]],":", values[k])
                flag = false
                break
            }
           /*  if(k === column.length -1){
                ret.push(data[i])
                //console.log(data[i])
            } */
            //console.log(column[k])
            //console.log(data[i][column[k]])

        }
        if(Boolean(flag)){
            ret.push(data[i])
            console.log(data[i])
        }
    }
    return ret
}
exports.searchCSV = searchCSV