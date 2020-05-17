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
        //var path = './../data/ks-projects-201801.csv'
        //var path = './../data/CommaTest.csv'
        //var path = './../data/SmallCommaTest.csv'
        var path = './../data/500.csv'
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
                    text = text.slice(1)
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
        //console.log(keys, items, num)
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
                //console.log("Set: ",retrieved)
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
        //console.log(items[0], items[0].length)
        //console.log(keys, items)
        //console.log("Type:",Object.prototype.toString.call(items[0]))
        if(Array.isArray(items[0])){
            //console.log("Trying to fix")
            let temp = items[0].slice()
            items.splice(0,1)
            let tempKeys = keys.slice()
            keys.splice(0,1)
            //console.log(keys, items)
            for(let i = temp.length; i > 0; i--){
                keys.splice(0,0,tempKeys[0])
                items.splice(0,0, temp[i-1])
            }
        }
        if(!this.mappedData.get(keys[0]).has(items[0])){
            return []
        }
        //console.log(keys, items)
        //check for empty parameters and throw them away 
        for(let i = 0; i < items.length; i++){
            if(items[i] === ''){
                //remove both the key and value
                items.splice(i,1)
                keys.splice(i,1)
                i--
            }
        }
        //console.log(keys, items)
        //We are now finding the index of the original in the tableData
        //console.log(this.mappedData.get(keys[0]))
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
                        let originalItem = this.tableData[dataIndex*this.columns + k]
                        //console.log("Original", originalItem)
                        this.tableData.splice(dataIndex*this.columns + k,1,items[i])
                        
                        //we are now getting the index reference of the original
                        //and removing it so in the mappedData
                        //console.log("Item value:", items[i])
                        //console.log("Item:", this.mappedData.get(keys[i]).get(originalItem))
                        if(this.mappedData.get(keys[i]).get(originalItem).size === 1){
                            this.mappedData.get(keys[i]).delete(originalItem)
                            if(this.mappedData.get(keys[i]).has(items[i])){
                                let updateSet = new Set()
                                updateSet = this.mappedData.get(keys[i]).get(items[i])
                                updateSet.add(dataIndex)
                                this.mappedData.get(keys[i]).set(items[i],updateSet)
                            }
                            else{
                                let tmp1 = new Set()
                                tmp1.add(dataIndex)
                                this.mappedData.get(keys[i]).set(items[i], tmp1)
                                
                            }
                            /*let tmp = new Set()
                            tmp.add(dataIndex)
                            this.mappedData.get(keys[i]).set(items[i],tmp) */
                        }
                        else{
                            //remove index and add it to the new spot
                            let tempSet = this.mappedData.get(keys[i]).get(originalItem)
                            tempSet.delete(dataIndex)
                            if(this.mappedData.get(keys[i]).has(items[i])){
                                let updateSet = new Set()
                                updateSet = this.mappedData.get(keys[i]).get(items[i])
                                updateSet.add(dataIndex)
                                this.mappedData.get(keys[i]).set(items[i],updateSet)
                            }
                            else{
                                let tmp1 = new Set()
                                tmp1.add(dataIndex)
                                this.mappedData.get(keys[i]).set(items[i], tmp1)

                            }

                        }
                        /* let old = this.mappedData.get(keys[i]).values().next().value
                        old.delete(dataIndex)
                        //we are now adding the index into the new updated value
                        //in the mappedData
                        let newer = this.mappedData.get(keys[i]).values().next().value.add(dataIndex)
                        newer.add(dataIndex) */
    
                    }
                }

            }
        }
        //return the new item that is retrieved using both the 
        //tableData and mapppedData. This will prove that the 
        //update was succesful 
        //console.log("Full Map: ",this.mappedData)
        keys.splice(0,1)
        items.splice(0,1)
        let updatedResult = this.searchCSV(keys,items)
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
        //console.log("Inserted",ret)
        
        return ret
    }

    deleteCSV(keys, items){
        //console.log("here", keys, items[0])
        //We are now finding the index of the target of deletion
        
        let retUpdate = []
        
        //allow for multi deletion
        //the ID's will be passed in as an iterable set
        for (let k = 0; k < items[0].length; k++){
            //console.log("Loop:", items[0][k])
            if(!this.mappedData.get(keys[0]).has(items[0][k])){
                continue
            }
            //get the last data row in the tableData
            //we will be using this to replace the target of deletion
            //not doing so will offset all indices stored in the mappedData
            //not replacing will require an entire rebuild
            let bottomRow = []
            for(let i = 0; i < this.columns;i++){
                bottomRow.push(this.tableData[this.tableData.length- this.columns + i])
            }
            //find the index of the bottom element
            let delIndex = this.mappedData.get(keys[0]).get(bottomRow[0]).values().next().value
            //console.log("Bottom Index:", delIndex)
            //CHANGE TO THIS FOR THE TIMING PART
            //console.log("Also Bottom Index:", this.tableData.length/this.columns - 1)
    
            //now we must delete this bottom row before replacing it to avoid having
            //duplicate IDs. We must preserve uniqueness for ID
            this.tableData.splice(this.tableData.length- this.columns, this.columns)
    
            //console.log("Map Before:", this.mappedData)

            //iterate through all the column names to ensure that every
            //part of its data row is deleted from the map
            for(let i = 0; i < keys.length; i++){
                //console.log(this.mappedData.get(keys[i]),"To Delete: ",bottomRow[0][i], "Key: ",keys[i], '\n')
                if(this.mappedData.get(keys[i]).has(bottomRow[i])){
                    let old = this.mappedData.get(keys[i]).get(bottomRow[i])
                    //console.log("old", old)
                    //if the set only contains one index, we remove the whole entry
                    if(old.size === 1){
                        let oldKey = this.mappedData.get(keys[i])
                        oldKey.delete(bottomRow[i])
                        //console.log("oldkey",oldKey)
                    }
                    //if the set has more than one, we remove the index element from the set
                    else{
                        //console.log("old", old)                    
                        this.mappedData.get(keys[i]).get(bottomRow[i]).delete(delIndex)
                    }
                }
            }
    
            //now must use the deleted bottom row to replace/update the original target for deletion
            //create shallow copies of parameters in case they get modified
            let tempKeys = keys.slice()
            let tempItems = []
            tempKeys.splice(0,0,keys[0])
            tempItems.push(items[0][k])
            //add the ID of the bottom row to use as a key
            for(let i = 0; i < bottomRow.length; i++){
                tempItems.push(bottomRow[i])
            }
    
            //update the target of deletion with the bottom row
            retUpdate.push(this.updateCSV(tempKeys,tempItems))
            //console.log("Full Table: ",this.tableData)
            
        }
        //console.log("Full Map: ",this.mappedData)
        return retUpdate
    }

    backupCSV(keys,items){
        let filename = items[0]
        let writer = fs.createWriteStream("./../data/backups/" + filename + ".csv", {flags: 'w'})
        for(let i = 0; i < this.tableData.length; i++){
            writer.write(this.tableData[i], 'utf8')
            if(i % this.columns < this.columns - 1){
                writer.write(",", 'utf8')
            }
            else{
                writer.write("\n", 'utf8')
            }
        }
        writer.on('finish', () => {
            console.log("Finished Writing!")
        })
        writer.end()
    }

    importCSV(keys, items){
        let filename = items[0]
        var path = './../data/backups/' + filename + ".csv"
        let content = fs.readFileSync(path, 'utf8')
        this.tableData = this.parseCSV(content)
        this.mappedData = this.createData()
        //console.log(this.mappedData)
    }

    analysisCSV(keys,items){
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        //console.log(tempKeys, tempItems)
        let allRows = this.searchCSV(tempKeys, tempItems)
        //console.log("Unsorted", allRows)
        //the usd_pledge_real is on column 13

        allRows.sort(function(a,b){
            return b[13] - a[13]
        })
        //console.log("Sorted", allRows)
        return allRows.slice(0,5)
    }

    stateCountCSV(keys, items){
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        let allRows = this.searchCSV(tempKeys, tempItems)
        let success = 0
        let fail = 0
        //console.log(allRows[0])
        for (let i = 0; i < allRows.length; i++){
            if (allRows[i][9] === 'successful'){
                success += 1
            }
            else if (allRows[i][9] === 'failed'){
                fail += 1
            }
        }
        let ret = []
        console.log("success", success)
        ret.push(success)
        console.log("fail", fail)
        ret.push(fail)
        return ret
    }

    pledgeBackerCSV(keys, items){
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        let topRows = this.analysisCSV(tempKeys, tempItems)
        let ret = []
        let backCol = 10
        let pledgeCol = 13
        for(let i = 0; i < topRows.length; i++){
            let temp = []
            temp.push(topRows[i][pledgeCol])
            temp.push(topRows[i][backCol])
            ret.push(temp)
        }
        console.log(ret)
        return ret
    }

    popCatCSV(keys,items){
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        let allRows = this.searchCSV(tempKeys, tempItems)
        let catCount = new Map()
        let catRow = 2
        for(let i = 0; i < allRows.length; i++){
            //if the category exists, increment
            if(catCount.has(allRows[i][catRow])){
                catCount.set(allRows[i][catRow], catCount.get(allRows[i][catRow]) + 1)
            }
            //else initialize with 1
            else{
                catCount.set(allRows[i][catRow], 1)
            }
        }
        //console.log(...catCount)
        let arrayCat = [...catCount]
        arrayCat.sort(function(a,b){
            return b[1] - a[1]
        })
        //console.log(arrayCat)
        return arrayCat.slice(0,5)
    }

    richCountriesCSV(keys, items){
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        let allRows = this.searchCSV(tempKeys, tempItems)
        let countries = new Map()
        let contRow = 11
        let pledgeRealRow = 13
        for(let i = 0; i < allRows.length; i++){
            //if the category exists, increment
            if(countries.has(allRows[i][contRow])){
                countries.set(allRows[i][contRow], parseFloat(countries.get(allRows[i][contRow])) + parseFloat(allRows[i][pledgeRealRow]))
            }
            //else initialize with first number
            else{
                countries.set(allRows[i][contRow], parseFloat(allRows[i][pledgeRealRow]))
            }
        }
        //convert to an array of pairs
        let arrayCountries = [...countries]
        arrayCountries.sort(function(a,b){
            return b[1] - a[1]
        })
        //console.log(arrayCountries)
        return arrayCountries.slice(0,5)
    }

    topMainCatergoryCSV(keys, items){
        let tempKeys = keys.slice()
        let tempItems = items.slice()
        let allRows = this.searchCSV(tempKeys, tempItems)
        let MainCat = new Map()
        let contRow = 3
        let pledgeRealRow = 13
        for(let i = 0; i < allRows.length; i++){
            //if the category exists, increment
            if(MainCat.has(allRows[i][contRow])){
                MainCat.set(allRows[i][contRow], MainCat.get(allRows[i][contRow]) + parseFloat(allRows[i][pledgeRealRow]))
            }
            //else initialize with first number
            else{
                MainCat.set(allRows[i][contRow], parseFloat(allRows[i][pledgeRealRow]))
            }
        }
        //convert to an array of pairs
        let arrayMainCat = [...MainCat]
        arrayMainCat.sort(function(a,b){
            return b[1] - a[1]
        })
        console.log(arrayMainCat)
        return arrayMainCat.slice(0,5)
    }

}
exports.KickStarter = KickStarter