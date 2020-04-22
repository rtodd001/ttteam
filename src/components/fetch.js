import {globalArray} from './Global'
function request(category, backers, state) {
    // var url = new URL('http://192.168.1.8:5000/search')
    var url = new URL('http://localhost:5000/search')
    var params = {'main_category':category, 'backers':backers, 'state':state} // or:
    // var params = [['main_category', category],['state', 'failed']]      
    url.search = new URLSearchParams(params).toString();            
    fetch(url)
    .then(response => response.json())
    .then((result) => {
        console.log("this is result back");
        console.log(result.item[0]);
      
        let array = [];
        
        array.push(result.item[0].data);
        array.forEach(elements => {
            elements.forEach(item => {
                globalArray.push(item);
            })
        })
        console.log("GlobalArray after pushing")
        console.log(globalArray);
    })
}
export { request };