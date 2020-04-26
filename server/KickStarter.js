const fs = require('fs')
const Promise = require('promise')

class KickStarter {
    constructor(){
        this.columns = 15
        //console.log(this.getCSV())
        this.tableData =  this.getCSV()
        //console.log(this.tableData)
        this.mappedData = this.createData()
        //console.log(this.mappedData)
    }

    get col(){
        return this.columns
    }

    get mapData(){
        return this.mappedData
    }

    getCSV() {
        var path = './../data/CommaTest.csv'
        let content = fs.readFileSync(path, 'utf8')
        let lst = this.parseCSV(content)
        //console.log(lst)
        return lst
    };

    parseCSV(text) {
        let ret = []
        //console.log data[0])
        for(let  i = 0; i < text.length; i++){
            let temp = ""
            if(text[i] === ','){
                i--
                //console.log("\nComma\n")
                text = text.slice(1)
                //i++
            }
            //console.log("\nText:",text, '\n')
            while(text[i] !== ',' && i < text.length){
                //console.log(text[i])
                if(text[i] === '\r' || text[i] === '\n'){
                    //console.log("\nnewline\n")
                    text = text.slice(2)
                    i--
                    break
                }
                if(text[i] === '\"'){
                    break
                }
                temp += text[i]
                text = text.slice(text[i].length)
            }
            //console.log("While:" , temp)
            if(text[i] === '\"'){
                let re = RegExp('\".+\"','g')
                temp = re.exec(text)[0]
                //console.log("\nREGEX:", temp)
                text = text.slice(temp.length)
            }
            if(temp.length !== 0){
                ret.push(temp)
            }
            if(text[i] === ','){
                i--
                //console.log("\nComma\n")
                text = text.slice(1)
                //i++
            }
        }
        return ret
    }

    createData() {
        //console.log("Col:", this.col)
        if(this.tableData.length === 0){
            return []
        }
        let newSize = 0
        let totalElem = 0
        let title = new Map()
        //console.log("Columns:", columns, "| Rows:", Math.floor(this.tableData.length/columns), "Size:", this.tableData.length)
        for(let i = 0; i < this.columns; i++){
            title.set(this.tableData[i], new Set())
            //console.log("title:" , this.tableData[i])
    
            let item = new Map()
            //console.log("Size:", this.tableData.length, "I", i)
            for(let k = Math.floor(i+ this.columns); k < Math.floor(this.tableData.length); k+=this.columns){
                //console.log("Loop index", k,"| Title:",this.tableData[i])
                let row = Math.floor(k / this.columns)
                let name = this.tableData[k]
                if(item.has(name)){
                    let temp = item.get(name)
                    temp.add(row)
                    //console.log("Updating:","Name:", name, "| Rows:", temp)
                    item.set(name, temp)
                }
                else{
                    let temp = new Set()
                    temp.add(row)
                    //console.log("Creating:","Name:", name, "| index:", row)
                    item.set(name, temp)
                }
                //console.log("Adding to :", this.tableData[k%this.columns])
                title.set(this.tableData[k%this.columns], item)
                //console.log("Col:", this.tableData[i])
            }
            //newSize += title.get(this.tableData[i]).size
        }
        //console.log("New Size:", newSize)
        //console.log("Full Map", title)
        return title
    }

    searchCSV (keys, values){
        //edge case for empty data structure
        if(this.tableData.length === 0){
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
            let tempMap = this.mappedData.get(keys[i])
            //find the value we are searching for
            if(tempMap.has(values[i])){
                //an array of array gets stored here of all indices
                //console.log("Val:", tempMap.get(values[i]))
                let retrieved = []
                retrieved = Array.from(tempMap.get(values[i]))
                indices = indices.concat(retrieved)
                console.log("Set: ",retrieved)
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
                        extractedRow.push(this.tableData[indices[i]* columns + k])
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
                extractedRow.push(this.tableData[indices[0]* columns + k])
            }
            ret.push(extractedRow)
        }
        return ret
    }

    updateCSV (keys, values) {
        //if there is not enough information give, return nothing
        if(keys.length < 2){
            return []
        }
    
        //find the unique ID to update
        let id = []
        id.push(keys[0])
        //console.log([keys[0]])
        //console.log("this.tableData", this.tableData)
        let original = []
        original = this.searchCSV([keys[0]],[values[0]])
        console.log(keys, values)
        console.log("Original", original)
        //find out what needs to be changed
        let index = []
        for (let i = 1; i <= keys.length; i++){
            for(let k = 0; k < this.columns; k++){
                if(keys[i] === this.tableData[k]){
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
}
exports.KickStarter = KickStarter