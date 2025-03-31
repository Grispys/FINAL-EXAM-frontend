// let's do this boys

//this is not a function as it will always be checking for submissions via html.
// validity checks if the answer fits the regex of 0-9 + commas, and then sends a post request
// via that. 

let answer;
let getData;
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

function updateHTML(){
    getBackend()
    var element = document.getElementById("getRequest");
    element.innerHTML = "";
    element.innerHTML = getData
}

document.getElementById("getRequest")


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

function getBackend(){
    fetch('http://localhost:8080/api/trees')
        .then(async (response) => {
            const rawData = await response.json();
            const cleanData = JSON.stringify(rawData)
            getData = cleanData;
            console.log("RECEIVED:",cleanData)
        })
       
	    .catch(error => console.error('Error:', error));
        
}

console.log("Debug: Javascript's hooked up!")