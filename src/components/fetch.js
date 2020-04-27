import {globalArray} from './Global'
function searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
    var url = new URL('http://localhost:5000/search')
    var params = {'main_category':category, 'backers':backers, 'state':state} // or:
    var testParam = {
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
    
    url.search = new URLSearchParams(testParam).toString();            
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

        console.log(result);
    })
}

function insertItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    var url = new URL('http://localhost:5000/insert')
    var testParam = {
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

    url.search = new URLSearchParams(testParam).toString();            
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
    var testParam = {
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

    url.search = new URLSearchParams(testParam).toString();            
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