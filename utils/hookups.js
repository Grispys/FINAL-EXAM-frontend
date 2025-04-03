// let's do this boys

// 

let answer;
let getData;
let numbers;

let networkConnection;

document.getElementById("submit").onclick = async function (){
    answer = document.getElementById("answer").value
    let validity = /^[0-9,]+$/.test(answer)
    if(validity){
        numbers = answer.split(',').map(Number);
        // numbers.sort(function(a,b) {
            // return a - b;
        // });
        // gTLNumbers = numbers.toReversed(); 
        console.log(numbers)
        await updateHTML()
    }else{
        window.alert(`Please enter a query that follows the format "1,2,3,4,5..."`)
    }

    
    
}

// updates the html element "getrequest", which is a p tag, to the getRequests data
async function updateHTML(){
    var element = document.getElementById("getRequest");
    element.innerHTML = "Loading..."
    await postBackend()
    
    await getBackend()
    if(networkConnection){
        console.log(getData)
        var parsedData = JSON.parse(getData);
        var indentedData = JSON.stringify(parsedData, null, 2);
        element.innerHTML = `<pre>${indentedData}</pre>`;
        
    }else{
        element.innerHTML = "Ooops! Looks like you don't have the backend set up. <br> I'm looking at http://localhost:8080/api/trees. Is anything there?"
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
async function getBackend(){
    try {
		const response = await fetch('http://localhost:8080/api/trees/most-recent');
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