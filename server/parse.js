const parseCSV = (data) => {
    //there are commas in the names of products used so we cannot use split()
    //this regex replaces split() and will extract all the cells that we need into
    //an array of strings
   /*  let re =/(\"+(?=.*\").*\")|(^\"|\?|\/|\.|\;|\·|\||\*|\!|\-|\&|\:|\w|\ |\'|\(|\)|\™|\¿|[^\x00-\x7F]|\s$)+/g
   //(\"+(?=.*\").*\")|(^\"|\?|\/|\.|\;|\·|\||\*|\!|\-|\&|\:|\w|\ |\'|\(|\)|\™|\¿|[^\x00-\x7F]|[\x23-\x2B]|[\x2D-\x7F]|\s$)+
    let temp = "" + data[0]
    var lst = temp.toString().match(re) */
    let counter = 0;
    let columns = 15
    let ret = []
    let text = data[0]
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
        /* if(data[0][i] === ÉOF){
            break
        } */
        
        //console.log("New",temp)
    }
    //console.log(ret)
    return ret
}
exports.parseCSV = parseCSV;