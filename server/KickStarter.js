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
            for(let k = Math.floor(i + this.columns); k < Math.floor(this.tableData.length); k+=this.columns){
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

    searchCSV (keys, items){
        //edge case for empty data structure
        if(this.tableData.length === 0){
            return []
        }
        //create our return array
        let ret = []
    
        //check for empty parameters and throw them away 
        for(let i = 0; i < items.length; i++){
            if(items[i] === ''){
                //remove both the key and value
                items.splice(i,1)
                keys.splice(i,1)
                i--
            }
        }
        let num = keys.length
        console.log(keys, items, num)
        let indices = []
    
        //iterate over the columns first
        for(let i = 0; i < keys.length; i++){
            //get the map assosciated with the key/column
            let tempMap = this.mappedData.get(keys[i])
            //find the value we are searching for
            if(tempMap.has(items[i])){
                //an array of array gets stored here of all indices
                let retrieved = []
                retrieved = Array.from(tempMap.get(items[i]))
                indices = indices.concat(retrieved)
                console.log("Set: ",retrieved)
            }
        }
        //sort all the numbers
        indices.sort(function(a,b){
            return a - b 
        });
        //console.log("Index: ", indices)
        let prev = -1
        let counter = 0
        //iterate throught the indices to see all the matching ones
        for(let i = 0; i < indices.length; i++){
            if(indices[i] === prev || keys.length === 1){
                counter++
                if(counter === keys.length - 1|| keys.length === 1){
                    //console.log("index: ", indices[i], counter)
                    counter = 0
                    let extractedRow = []
                    for(let k = 0; k < this.columns; k++){
                        extractedRow.push(this.tableData[indices[i]* this.columns + k])
                    }
                    ret.push(extractedRow)
                }
                /* if(keys.length === 1){
                    counter = 0
                } */
            }
            else{
                counter = 0
            }
            prev = indices[i]
        }
        /* if(indices.length === 1){
            let extractedRow = []
            for(let k = 0; k < columns; k++){
                extractedRow.push(this.tableData[indices[0]* columns + k])
            }
            ret.push(extractedRow)
        } */
        return ret
    }

    updateCSV (keys, items) {
        //if there is not enough information given, return nothing
        if(keys.length < 2){
            return []
        }
        //We are now finding the index of the original in the tableData
        let dataIndex = this.mappedData.get(keys[0]).get(items[0]).values().next().value
        //iterate through all the things we must update
        for (let i = 1; i <= keys.length; i++){
            //ommit the empty parameters
            if(items[i] !== ''){
                //find the position of the item that we are updating
                for(let k = 0; k < this.columns; k++){
                    //if the key matches the column, we do the update
                    if(keys[i] === this.tableData[k]){
                        //update the tableData first
                        this.tableData.splice(dataIndex*this.columns + k,1,items[i])
                        //we are now getting the index reference of the original
                        //and removing it so in the mappedData
                        let old = this.mappedData.get(keys[i]).values().next().value
                        old.delete(dataIndex)
                        //we are now adding the index into the new updated value
                        //in the mappedData
                        let newer = this.mappedData.get(keys[i]).values().next().value.add(dataIndex)
                        newer.add(dataIndex)
    
                    }
                }

            }
        }
        //return the new item that is retrieved using both the 
        //tableData and mapppedData. This will prove that the 
        //update was succesful 
        let updatedResult = this.searchCSV([keys[0]],[items[0]])
        return updatedResult
    }

    insertCSV(keys, items){
        //force that every element has to be present so we do not have empty data points
        if(keys.length !== this.columns && items.length !== this.columns){
            return []
        }
        for(let i = 0; i < items.length; i++){
            this.tableData.push(items[i])
            let tempMap = this.mappedData.get(keys[i])//.get(items[i]).values().next().value
            //console.log("Temp:", i, tempMap)
            if(tempMap.has(items[i])){
                let tempSet = tempMap.get(items[i])
                tempSet.add(Math.floor(this.tableData.length/this.columns))
                this.mappedData.get(keys[i]).set(items[i], tempSet)
            }
            else{
                let tempRow = new Set()
                console.log(Math.floor((this.tableData.length - 1)/this.columns))
                tempRow.add(Math.floor((this.tableData.length - 1)/this.columns))
                this.mappedData.get(keys[i]).set(items[i],tempRow)
                //console.log("Inserted New: ", this.mappedData.get(keys[i]).set(items[i],tempRow))
            }
        }
        let ret = this.searchCSV(keys, items)
        console.log("Inserted",ret)
        return ret
    }

    deleteCSV(keys, items){
        //We are now finding the index of the target of deletion
        if(!this.mappedData.get(keys[0]).has(items[0])){
            return []
        }
        //console.log(keys, items)
        
        let deleteIndex = this.mappedData.get(keys[0]).get(items[0]).values().next().value
        
        //console.log("DeleteIndex:", deleteIndex)
        //console.log("Calculated Index:",deleteIndex*this.columns)
        
        //make shallow copies because Search mutates the parameters
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        let toDelete = this.searchCSV(tempKeys, tempItems)
        console.log(toDelete)
        this.tableData.splice((deleteIndex*this.columns), this.columns)
        //console.log("Map Before:", this.mappedData)
        for(let i = 0; i < tempKeys.length; i++){
            //let tempMap = this.mappedData.get(tempKeys[i])
            //console.log(this.mappedData.get(tempKeys[i]),"To Delete: ",toDelete[0][i], "Key: ",tempKeys[i], '\n')
            if(this.mappedData.get(tempKeys[i]).has(toDelete[0][i])){
                let old = this.mappedData.get(tempKeys[i]).values().next().value
                //console.log("old", old)
                if(old.size === 1){
                    let oldKey = this.mappedData.get(tempKeys[i])
                    oldKey.delete(toDelete[0][i])
                    //console.log("oldkey",oldKey)
                    //this.mappedData.get(tempKeys[i]).delete(deleteIndex)
                    //console.log("Size 1: ", this.mappedData.get(tempKeys[i]), deleteIndex)
                }
                else{
                    old.delete("old",deleteIndex)
                }
                //tempMap.get(toDelete[0][i]).values().next().value.delete(deleteIndex)
            }
        }
        //console.log("Map After:", this.mappedData)
        return toDelete[0]
    }
}
exports.KickStarter = KickStarter