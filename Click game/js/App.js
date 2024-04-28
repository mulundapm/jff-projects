//When start, is clicked, start a 10s and listen to the count of click on click button. print the count on the "Click"
// when timeout, take the click count as an alert "This is your scrore"
// add to local storage is score > top scrore and display on as top score
const start = document.querySelector(".start")
const click = document.querySelector(".boost")
const clickCount = document.querySelector(".score")
const topScore = document.querySelector(".top-score")
const reset = document.querySelector(".reset")
const countDown = document.querySelector(".countDown")

let count;
let id;

window.addEventListener("DOMContentLoaded", function(){
    localStorage.getItem("Score list")? showTopScore():null
})

start.addEventListener("click", function(){
    startGame();
})

function startGame(){
    count = 5;
    clicks = 0;
    const timer = setInterval(function(){
        count--;
        displayCountdown(count);
        if (count === 0){
            clearInterval(timer)
            endGame()
        }
    },1000)
    unLock();
    start.disabled = true
    setTimeout(function(){
        start.disabled = false
    }, 5000)
}

function endGame(){
    click.disabled = true;
    const score = {score: clicks, id: id};
    console.log(score);
    let list = getLocalStorage();
    list.push(score)
    localStorage.setItem("Score list", JSON.stringify(list));
    clicks = 0
    showTopScore();
}

function getLocalStorage(){
    return localStorage.getItem("Score list")? JSON.parse(localStorage.getItem("Score list")): [];
}

click.addEventListener("click", function(){
    clicks ++;
    clickCount.innerHTML = `Clicks: ${clicks}`;
})

function unLock(){
    click.disabled = false
    id = new Date().getTime().toString();
    }

    //get the highest score from local storage and display scroe
function showTopScore(){
    let scorelist = getLocalStorage()
    // let ts = Math.max(scorelist.score)
    let ts = Math.max.apply(Math, scorelist.map(function(round) { return round.score; }))
    topScore.innerHTML = `Top Score: ${ts}`
}

function displayCountdown(count){
    if (count>=0){
        countDown.innerHTML = `Countdown: ${count}`;
    }
}

reset.addEventListener("click", function(){
    localStorage.clear();
    topScore.innerHTML = "Top Score: "
    clickCount.innerHTML = "Clicks: 0"
})
