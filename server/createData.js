const createData = (data) => {
    let columns = 15
    if(data.length === 0){
        return []
    }
    let newSize = 0
    let totalElem = 0
    let title = new Map()
    console.log("Columns:", columns, "| Rows:", Math.floor(data.length/columns), "Size:", data.length)
    for(let i = 0; i < columns; i++){
        title.set(data[i], [])
        console.log("title:" , data[i])

        let values = new Map()
        //console.log("Size:", data.length, "I", i)
        for(let k = Math.floor(i+ columns); k < Math.floor(data.length); k+=columns){
            //console.log("Loop index", k,"| Title:",data[i])
            let row = Math.floor(k / columns)
            let name = data[k]
            if(values.has(name)){
                let temp = values.get(name)
                temp.push(row)
                //console.log("Updating:","Name:", name, "| Rows:", temp)
                values.set(name, temp)
            }
            else{
                let temp = []
                temp.push(row)
                //console.log("Creating:","Name:", name, "| index:", row)
                values.set(name, temp)
            }
            //console.log("Adding to :", data[k%columns])
            title.set(data[k%columns], values)
            //console.log("Col:", data[i])
        }
        //newSize += title.get(data[i]).size
    }
    //console.log("New Size:", newSize)
    //console.log("Full Map", title)
    return title
}
exports.createData = createData