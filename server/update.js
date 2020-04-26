const search = require('./searchData')

const updateCSV = (keys, values, mappedData, data) => {
    //the number of columns in our data set
    let columns = 15
    //if there is not enough information give, return nothing
    if(keys.length < 2){
        return []
    }

    //find the unique ID to update
    let id = []
    id.push(keys[0])
    //console.log([keys[0]])
    //console.log("Data", data)
    let original = []
    original = search.searchCSV([keys[0]],[values[0]], mappedData, data)
    console.log(keys, values)
    console.log("Original", original)
    //find out what needs to be changed
    let index = []
    for (let i = 1; i <= keys.length; i++){
        for(let k = 0; k < columns; k++){
            if(keys[i] === data[k]){
                index.push(k)
                console.log(values[i],k)
                //NEED TO ACTUALLY IMPLEMENT THE UPDATE
                original[0].splice(k,1,values[i])
            }
        }
    }
    console.log("After", original)
    //console.log("Index to update", index)
    return original
}
exports.updateCSV = updateCSV