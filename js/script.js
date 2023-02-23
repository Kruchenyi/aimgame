//@prepros-append main.js
// ПодКЛЮЧЕНИЕ ФАЛОВ JS============================================================================

const remainderTime = document.querySelector(".remainder-time");
const numbers = document.querySelector(".block__num");
const circle = document.querySelector(".board-block__circle");
const board = document.querySelector(".board-block");
const pages = document.querySelectorAll(".block__content");
const start = document.querySelector(".block__start a");
start.addEventListener("click", (event) => {
  event.preventDefault();
  chengePages(0);
});

let time = 0;
let score = 0;

const times = document.querySelector(".block__time");
times.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-block")) {
    time = parseInt(event.target.getAttribute("data-time"));
    chengePages(1);
    startGame();
  }
});
board.addEventListener("click", clickCircle);
function clickCircle(event) {
  if (event.target.classList.contains("board-block__circle")) {
    score++;
    getRandomCircle();
    event.target.remove();
  }
}
let timerId;
function startGame() {
  timerId = setInterval(changeTime, 1000);
  remainderTime.innerHTML = `00:${time}`;

  getRandomCircle();
}

function changeTime() {
  if (time < 0) {
    clearInterval(timerId);
  }
  current = time--;
  console.log(time);
  if (current == 0) return finishGame();
  if (current < 10) current = `0${current}`;
  remainderTime.innerHTML = `00:${current}`;
}

function finishGame() {
  numbers.style.opacity = "0";
  board.innerHTML =
    `<div class="your-score">Счет: ${score} </div>` +
    `<button class="new-game">Новая игра</button`;
  const newGame = document.querySelector(".new-game");
  newGame.addEventListener("click", () => {
    pages[1].classList.remove("block--up");
    board.innerHTML = "";
    numbers.style.opacity = "1";
    score = 0;
  });
}

function chengePages(item) {
  pages[item].classList.add("block--up");
}

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("board-block__circle");
  let size = getRandomNumber(10, 40);
  const colorArray = ["#008B8B", "#FF4500", "#00BFFF", "#F0E68C"];
  let randomIndex = Math.floor(Math.random() * colorArray.length);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.style.top = y + "px";
  circle.style.left = `${x}px`;
  circle.style.background = colorArray[randomIndex];
  circle.style.boxShadow = `1px 1px 2px ${colorArray[randomIndex]}`;
  circle.style.width = size + "px";
  circle.style.height = size + "px";

  board.append(circle);
}
