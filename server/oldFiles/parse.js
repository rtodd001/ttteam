const parseCSV = (text) => {
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
    //console.log(ret)
    return ret
}
exports.parseCSV = parseCSV;