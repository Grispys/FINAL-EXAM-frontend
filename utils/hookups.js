// let's do this boys

//this is not a function as it will always be checking for submissions via html.
// validity checks if the answer fits the regex of 0-9 + commas, and then sends a post request
// via that. 

let answer;
document.getElementById("submit").onclick = function (){
    answer = document.getElementById("answer").value
    let validity = /^[0-9,]+$/.test(answer)
    if(validity){
        
        console.log(answer)
    }else{
        window.alert(`Please enter a query that follows the format "1,2,3,4,5..."`)
    }
    
}

function sendBackend(){
    fetch('http://localhost8080/api/trees', {
        method: 'POST',
        headers: {
            'Content-type:'
        }
    })
}

console.log("Debug: Javascript's hooked up!")