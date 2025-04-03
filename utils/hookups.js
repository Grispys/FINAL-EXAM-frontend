// let's do this boys

// 

let answer;
let getData;
let numbers;

let networkConnection;

// async button function that turns the user string input into a number array for the backend
document.getElementById("submit").onclick = async function (){
    answer = document.getElementById("answer").value
    let validity = /^[0-9,]+$/.test(answer)
    if(validity){
        numbers = answer.split(',').map(Number);
        console.log(numbers)
        await updateHTML("recent")
    }else{
        window.alert(`Please enter a query that follows the format "1,2,3,4,5..."`)
    }  
}

document.getElementById("previous").onclick = async function (){
    await updateHTML("all")
}  



// updates the html element "getrequest", which is a p tag, to the getRequests data
async function updateHTML(query){
    var element = document.getElementById("getRequest");
    element.innerHTML = "Loading..."
    
    if(query =="recent"){
        await postBackend()
    
        await getBackend("recent")
        if(networkConnection){
            console.log(getData)
            var parsedData = JSON.parse(getData);
            var indentedData = JSON.stringify(parsedData, null, 2);
            element.innerHTML = `<pre>${indentedData}</pre>`;
            
        }else{
            element.innerHTML = "Ooops! Looks like you don't have the backend set up. <br> I'm looking at http://localhost:8080/api/trees. Is anything there?"
        }
    }else if(query =="all"){
        
        await getBackend("all")
        if(networkConnection){
            console.log(getData)
            var parsedData = JSON.parse(getData);
            var indentedData = JSON.stringify(parsedData, null, 2);
            element.innerHTML = `<pre>${indentedData}</pre>`;
            
        }else{
            element.innerHTML = "Ooops! Looks like you don't have the backend set up. <br> I'm looking at http://localhost:8080/api/trees. Is anything there?"
        }
    }

   
   
}

// sends that data as a post request to the localhost
async function postBackend(){
    try {
        const request = await fetch('http://localhost:8080/api/trees/process-numbers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(numbers)
        })
        const data = await request.json()
        console.log("Success!", data)

    }catch{
        console.error('Error:', error)
    }
}

// sends a get request to the localhost, changes it to string, and sets global variable
// getData to that stringified jumbo
async function getBackend(query){
    let fetchURL;
    if(query == "recent"){
        fetchURL = 'http://localhost:8080/api/trees/most-recent'
    }else if(query == "all"){
        fetchURL = 'http://localhost:8080/api/trees/previous-trees'
    }

    try {
		const response = await fetch(fetchURL);
		networkConnection = true;
		const rawData = await response.json();
		getData = rawData;
		console.log("RECEIVED:", getData);
	} catch (error) {
		console.error('Error:', error);
		networkConnection = false;
	}
}

console.log("Debug: Javascript's hooked up!")