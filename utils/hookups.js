// let's do this boys

//this is not a function as it will always be checking for submissions via html.
// validity checks if the answer fits the regex of 0-9 + commas, and then sends a post request
// via that. 

let answer;
let getData;

let networkConnection;

document.getElementById("submit").onclick = function (){
    answer = document.getElementById("answer").value
    let validity = /^[0-9,]+$/.test(answer)
    if(validity){
        const numbers = answer.split(',').map(Number);
        numbers.sort(function(a,b) {
            return a - b;
        });
        const gTLNumbers = numbers.toReversed(); 
        console.log(gTLNumbers)
    }else{
        window.alert(`Please enter a query that follows the format "1,2,3,4,5..."`)
    }

    
    updateHTML()
}

// updates the html element "getrequest", which is a p tag, to the getRequests data
async function updateHTML(){
    var element = document.getElementById("getRequest");
    element.innerHTML = "Loading..."
    await getBackend()
    if(networkConnection){
        element.innerHTML = getData
    }else{
        element.innerHTML = "Ooops! Looks like you don't have the backend set up. <br> I'm looking at http://localhost:8080/api/trees. Is anything there?"
    }
   
}

// sends that data as a post request to the localhost
function postBackend(){
    fetch('http://localhost:8080/api/trees', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({

        })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

// sends a get request to the localhost, changes it to string, and sets global variable
// getData to that stringified jumbo
async function getBackend(){
	try {
		const response = await fetch('http://localhost:8080/api/trees');
		networkConnection = true;
		const rawData = await response.json();
		const cleanData = JSON.stringify(rawData);
		getData = cleanData;
		console.log("RECEIVED:", cleanData);
	} catch (error) {
		console.error('Error:', error);
		networkConnection = false;
	}
}

console.log("Debug: Javascript's hooked up!")