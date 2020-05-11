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
    // console.log(globalArray);
    console.log('37', array);
    return array[0]; 
}

async function insertItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
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
    let response = await fetch(url, {
        method: 'POST'
    });         
    let result = await response.json();
}

async function updateItem(updateID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
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
    let response = await fetch(url, {
        method: 'PUT'
    });         
    let result = await response.json();
}

async function deleteItem(ID) {
    let params = {
        'ID' : ID
    }    
    let url = new URL('http://localhost:5000/delete')
    url.search = new URLSearchParams(params).toString();   
    let response = await fetch(url, {
        method: 'DELETE'
    });         
    let result = await response.json();
}


async function importFile(fileName) {
    let url = new URL('http://localhost:5000/import')
    url.search = new URLSearchParams(fileName).toString();            
    let response = await fetch(url, {
        method: 'GET'
    });         
    let result = await response.json(); 
}

async function storeFile(fileName) {
    var url = new URL('http://localhost:5000/backup')
    url.search = new URLSearchParams(fileName).toString();            
    let response = await fetch(url, {
        method: 'PUT'
    });         
    let result = await response.json();
}

async function a_top10(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
    console.log("fetch 127")
    var url = new URL('http://localhost:5000/analysis/top5')
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
    url.search = new URLSearchParams(params).toString();    
    let response = await fetch(url);
    let result = await response.json();
    let array = [];
    
    array.push(result.item[0].data);
    array.forEach(elements => {
        elements.forEach(item => {
            globalArray.push(item);
        })
    })
    
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
    url.search = new URLSearchParams(params).toString();    
    let response = await fetch(url);
    let result = await response.json();
    let array = [];
    
    array.push(result.item[0].data);
    array.forEach(elements => {
        elements.forEach(item => {
            globalArray.push(item);
        })
    })

    return array[0]; 
}


async function pledgeBacker(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
    var url = new URL('http://localhost:5000/analysis/pledgeBack')
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
    let array = [];
    console.log(response);
    array.push(result.item[0].data);
    array.forEach(elements => {
        elements.forEach(item => {
            globalArray.push(item);
        })
    })

    return array[0]; 
}

async function popCat(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal) {
    // var url = new URL('http://192.168.1.8:5000/search')
    var url = new URL('http://localhost:5000/analysis/popCat')
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
    let array = [];
    console.log(response);
    array.push(result.item[0].data);
    array.forEach(elements => {
        elements.forEach(item => {
            globalArray.push(item);
        })
    })

    return array[0]; 
}


export { searchItem, insertItem, deleteItem, updateItem, importFile, storeFile, a_top10, a_state_cnt, pledgeBacker, popCat };