import {globalArray} from './Global'

async function searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
        var url = new URL('http://localhost:5000/search')
        var params = {
            'ID' : ID,
            'name' : name,
            'category' : category,
            'main_category': mainCategory,
            'currency' : currency,
            'deadline' : deadline,
            'goal' : goal,
            'launched' : launched,
            'pledged' : pledged,
            'state' : state,
            'backers' : backers,
            'country' : country,
            'usd pledged' : usdPledged,
            'usd_pledged_real' : usdPledgedReal,
            'usd_goal_real' : usdGoalReal
        }
    
        url.search = new URLSearchParams(params).toString();            
        let response = await fetch(url);
        let result = await response.json();
        console.log('26', result);
        let array = [];
        
        array.push(result.item[0].data);
        array.forEach(elements => {
            elements.forEach(item => {
                globalArray.push(item);
            })
        })
        console.log("GlobalArray after pushing")
        console.log(globalArray);
        console.log('40', array);
        return array[0]; 

}

function insertItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    var url = new URL('http://localhost:5000/insert')
    var params = {
        'ID' : ID,
        'name' : name,
        'category' : category,
        'main_category': mainCategory,
        'currency' : currency,
        'deadline' : deadline,
        'goal' : goal,
        'launched' : launched,
        'pledged' : pledged,
        'state' : state,
        'backers' : backers,
        'country' : country,
        'usd pledged' : usdPledged,
        'usd_pledged_real' : usdPledgedReal,
        'usd_goal_real' : usdGoalReal
    }

    url.search = new URLSearchParams(params).toString();            
    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json())
    .then((result) => {
        console.log("inserted an item", result);
    })
}

function updateItem(updateID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    var url = new URL('http://localhost:5000/update')
    var params = {
        'ID' : updateID,
        'name' : name,
        'category' : category,
        'main_category': mainCategory,
        'currency' : currency,
        'deadline' : deadline,
        'goal' : goal,
        'launched' : launched,
        'pledged' : pledged,
        'state' : state,
        'backers' : backers,
        'country' : country,
        'usd pledged' : usdPledged,
        'usd_pledged_real' : usdPledgedReal,
        'usd_goal_real' : usdGoalReal
    }

    url.search = new URLSearchParams(params).toString();            
    fetch(url, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then((result) => {
        console.log("Updated an item", result);
    })
}

function deleteItem(ID) {
    var url = new URL('http://localhost:5000/delete')
    url.search = new URLSearchParams(ID).toString();            
    fetch(url, {
        method: 'DEL'
    })
    .then(response => response.json())
    .then((result) => {
        console.log("deleted the item ", result);
    })
}

export { searchItem, insertItem, deleteItem, updateItem };