

//initial storage of values
let whiteListed = {urls: [],
                    last: "",
                counter: 0 }

// if there is data in window.name, get it
if(window.name) whiteListed = JSON.parse(window.name);
// update last whitelisted site visited
if(whiteListed.urls.includes(window.location.href)) {
    whiteListed.last = window.location.href;
    window.name = JSON.stringify(whiteListed)
}
// spawn window if url is not in whitelist, also ignore the popup window
if (!whiteListed.urls.includes(window.location.href) && !window.location.href.includes("hello.html")){

    //declare superparent that covers whole page to make positioning easier
const superparent = document.createElement("div")
superparent.style.position = "absolute"
superparent.style.pointerEvents = "none"
superparent.style.height = "100vh"
superparent.style.width = "100vw" 
superparent.style.display = "flex"
superparent.style.justifyContent = "center"
superparent.style.zIndex = "999"

//parent is main visible container
const parent = document.createElement("div")
parent.style.pointerEvents = "auto"
parent.style.width = '500px;'
parent.style.zIndex = "999"
parent.style.position = "fixed"
parent.style.top = '15%'
parent.style.backgroundColor = "rgba(204, 204, 255, 0.7)"
parent.style.padding = "20px"

//options div
const options = document.createElement('div');
options.style.display = "grid"
options.style.alignItems = "center"
options.style.justifyItems = "center"
options.style.gap = "10px"
// plz hackers dont look TODO: SET more styles as website style will overwrite defaults
options.innerHTML = `<style>
                            .timertitle {
                                color:red;
                                font-size: 2rem;
                                font-family: Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif;
                                text-align: center;
                                line-height: 1em;
                                margin: 10px 10px 10px 10px;
                            }
                            .timerbutton {
                                display: inline-block;
                                padding: 0.5em 1em;
                                background-color: #f5f5f5;
                                border: 1px solid #ccc;
                                line-height: 1em;
                                border-radius: 3px;
                                font-size: 14px;
                                font-weight: bold;
                                font-family: Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif;
                                text-align: center;
                                text-decoration: none;
                                color: #333;
                                cursor: pointer;
                            }
                            input {
                                display: inline-block;
                                margin: 0;
                                text-align: center;
                                padding: 1px 6px;
                                height: 3rem;
                                border: 1px solid #ccc;
                                border-radius: 1rem;
                                box-sizing: border-box;
                                font-family: Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif;
                                font-size: 14px;
                                line-height: 1.15;
                                width: 50%
                                
                            }
                     </style>
<h1 class="timertitle" >Do you really need to be here?</h1>
<input id="superinput" value="new countdown"/>
<button class="timerbutton" id="superinputbutton">set new countdown value</button>
<button class="timerbutton" id="superbutton">whitelist this url</button>
`
//timer div
const timer = document.createElement("div")
timer.style.textAlign = "center"
timer.style.color = "rgba(255, 94, 0, 0.85)";
timer.style.fontSize = "2.25rem"
timer.style.fontFamily = "Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif;"

//appending our created elements
parent.appendChild(timer)
parent.appendChild(options)
superparent.appendChild(parent)

document.body.insertBefore(superparent, document.body.firstChild)
// end of inserting divs and styling

//handle whitelisting and updating window.name storage
const whiteListButton = document.getElementById("superbutton")
whiteListButton.addEventListener("click", () => {
    console.log("clicked")
    whiteListed.urls.push(window.location.href)
    window.name = JSON.stringify(whiteListed)
    location.reload()
})
// get stored counter or start at 1000
let tempCounter = whiteListed.counter || 1000;
//handle changing countdown value
const input = document.getElementById("superinput")
const inputbutton = document.getElementById("superinputbutton")
inputbutton.addEventListener("click", () => {
    if (Number.isInteger(parseInt(input.value))){
        //prevent users from trapping themselves
        if(input.value < 10) { input.value = "not a great idea"};
        //set new counter variable
        whiteListed.counter = parseInt(input.value);
        window.name = JSON.stringify(whiteListed)
        location.reload()
    } else {
    return input.value = "you fr? 🙄"
    }
})
//update timer and run check if timer has run out
function printTime() {
  timer.innerText = tempCounter;
  tempCounter--
if(tempCounter <= 0){
    window.location.replace(whiteListed.last)
}
}
setInterval(printTime,1000);
} // end of big if statement



console.log("please work")

