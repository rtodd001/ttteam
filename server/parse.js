const parseCSV = (text) => {
    //there are commas in the names of products used so we cannot use split()
    //this regex replaces split() and will extract all the cells that we need into
    //an array of strings
    let ret = []
    //console.log data[0])
    for(let  i = 0; i < text.length; i++){
        let temp = ""
        /* if(text[i] === ','){
            i++
        } */
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
            //console.log("Before:",text.length)
            text = text.slice(text[i].length)
            //console.log("After:",text.length)
            //i++
        }
        //console.log("While:" , temp)
        if(text[i] === '\"'){
            let re = RegExp('\".+\"','g')
            temp = re.exec(text)[0]
            //console.log("\nREGEX:", temp)
            //i += temp.length
            //console.log("Before:",text.length)
            text = text.slice(temp.length)
            //console.log("After:",text.length)
            
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
    //console.log(ret)
    return ret
}
exports.parseCSV = parseCSV;