const createData = (data) => {
    let columns = []
    for(let i = 0; i < data.length; i++){
        let row =[]
        for(let j = 0; j < 15; j++){
            row.push(data[i])
            i++
        }
        i--
        columns.push(row)
    }
    return columns
}
exports.createData = createData