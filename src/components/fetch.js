import {globalArray} from './Global'

async function searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
<<<<<<< HEAD
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

=======
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
>>>>>>> siena_spr4
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

async function a_top10(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
    console.log("fetch 127")
    var url = new URL('http://localhost:5000/analysis/top10')
    console.log("fetch 129")
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
    console.log("fetch 147")
    url.search = new URLSearchParams(params).toString();    
    console.log("fetch 149")
    let response = await fetch(url);
    console.log("fetch 151")
    let result = await response.json();
    console.log("fetch 153")
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

async function a_state_cnt(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
    console.log("fetch 127")
    var url = new URL('http://localhost:5000/analysis/stateCount')
    console.log("fetch 129")
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
    console.log("fetch 147")
    url.search = new URLSearchParams(params).toString();    
    console.log("fetch 149")
    let response = await fetch(url);
    console.log("fetch 151")
    let result = await response.json();
    console.log("fetch 153")
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

<<<<<<< HEAD
export { searchItem, insertItem, deleteItem, updateItem };
=======
export { searchItem, insertItem, deleteItem, updateItem, importFile, storeFile, a_top10, a_state_cnt };
>>>>>>> siena_spr4
