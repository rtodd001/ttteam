const parseCSV = (data) => {
    //there are commas in the names of products used so we cannot use split()
    //this regex replaces split() and will extract all the cells that we need into
    //an array of strings
    let re =/(\"+(?=.*\").*\")|(^\"|\?|\/|\.|\;|\·|\||\*|\!|\-|\&|\:|\w|\ |\'|\(|\)|\™|\¿|\s$)+/g
    let temp = "" + data[0]
    var lst = temp.toString().match(re)
    return lst
}
exports.parseCSV = parseCSV;