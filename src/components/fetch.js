import {globalArray} from './Global'
function searchItem(category, backers, state) {
    // var url = new URL('http://192.168.1.8:5000/search')
    var url = new URL('http://localhost:5000/search')
    var params = {'main_category':category, 'backers':backers, 'state':state} // or:
    // var params = [['main_category', category],['state', 'failed']]      
    url.search = new URLSearchParams(params).toString();            
    fetch(url)
    .then(response => response.json())
    .then((result) => {
 
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

// function deleteData(item, url) {
//     return fetch(url + '/' + item, {
//       method: 'delete'
//     })
//     .then(response => response.json());
//   }

function insertItem(category, backers, state) {
    // var url = new URL('http://192.168.1.8:5000/search')
    var url = new URL('http://localhost:5000/insert')
    var params = {'main_category':category, 'backers':backers, 'state':state} // or:
    // var params = [['main_category', category],['state', 'failed']]      
    url.search = new URLSearchParams(params).toString();            
    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json())
    .then((result) => {
        console.log("inserted an item");
    })
}

export { searchItem, insertItem };