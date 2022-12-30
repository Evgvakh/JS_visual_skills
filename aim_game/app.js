const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector(".board");
const scoreDisplay = document.querySelector("#score");
const scoreMenu = document.querySelector(".scoresheet");
const records = document.querySelector(".records");
const colors = ['linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',
                'linear-gradient(90deg, #a216e3 0%, #c630ec 47%, #e846f7 100%)', 
                'linear-gradient(90deg, #e31616 0%, #ec3030 47%, #f74646 100%)', 
                'linear-gradient(90deg, #e3e016 0%, #e9ec30 47%, #f7e546 100%)',                 
                'linear-gradient(90deg, #46e316 0%, #40ec30 47%, #46f746 100%)'];

let time = 10;
let score = 0;
let name;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
  name = prompt('Your name');
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    scoreDisplay.textContent = score;
    createRandomCircle();
  }
});

function startGame() {
  renderRecordsList();
  setTime(time);  
  const interval = setInterval(function() {
    if (time === 0) {    
        finishGame();
        clearInterval(interval);
      } else {
        let current = --time;
        if (current < 10) {
          current = `0${current}`;
        }
        setTime(current);
      }
  }, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {    
    finishGame();
    clearInterval(interval);
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {      
  localStorage.setItem(name, score);
  timeEl.parentNode.style.visibility = "hidden";
  scoreMenu.style.visibility = "hidden";
  board.innerHTML = `<h1>Your score: <span>${score}</span></h1>`;
  records.innerHTML = '';
  renderRecordsList();
}

function getRandomNumber(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const { width, height } = board.getBoundingClientRect();

  let circleSize = getRandomNumber(10, 50);
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;

  circle.style.top = `${getRandomNumber(20, height - circleSize)}px`;
  circle.style.left = `${getRandomNumber(20, width - circleSize)}px`;

  circle.style.background = `${colors[getRandomNumber(0, colors.length)]}`;

  board.append(circle);
}

function renderRecordsList() {    
    const keys = Object.keys(localStorage);    

    let recordsArray = keys.map((key) => (         
        localStorage.getItem(key)
    ));
    
    const joint = keys.reduce((acc, n, i) => (acc[n] = recordsArray[i], acc), {});  
    const sorted = [];    
    
    for (let i in joint) {
        sorted.push([i, joint[i]]);
    }
    
    sorted.sort((a, b) => b[1] - a[1]);    
    sorted.splice(3, sorted.length); 
    const recordsHeader = document.createElement('h2');
    recordsHeader.textContent = 'Top scorers:';
    records.append(recordsHeader); 
    const recordsList = document.createElement("ul");

    for (let key in sorted) {    
        const recordsMan = document.createElement("li");
        let place = parseInt(key) + 1;        
        recordsMan.innerHTML = `${place}. <span>${sorted[key][0].toUpperCase()}</span> : ${sorted[key][1]} points`;
        recordsList.append(recordsMan);      
        records.append(recordsList);
    }
}
