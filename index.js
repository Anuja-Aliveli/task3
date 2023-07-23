const arrayList = [
  {
    question: "What is capital of India?",
    correct: "Delhi",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
  },
  {
    question: "What is capital of America?",
    correct: "Washington",
    options: ["Texas", "Delhi", "New York", "Washington"],
  },
  {
    question: "What is capital of UK?",
    correct: "London",
    options: ["Paris", "London", "Ottawa", "Beijing"],
  },
  {
    question: "What is National Animal of India?",
    correct: "Tiger",
    options: ["Elephant", "Lion", "Tiger", "Deer"],
  },
  {
    question: "What is National Bird of India?",
    correct: "Peacock",
    options: ["Peacock", "Parrot", "Pigeon", "Penguin"],
  },
  {
    question: "What country ruled India for over 200 years?",
    correct: "UK",
    options: ["USA", "UK", "France", "Russia"],
  },
  {
    question: "Which is Largest Ocean on Earth?",
    correct: "Pacific Ocean",
    options: [
      "Atlantic Ocean",
      "Arctic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
    ],
  },
  {
    question: "Which is Longest River in India?",
    correct: "Ganges",
    options: ["Brahmaputra", "Godavari", "Ganges", "Yamuna"],
  },
  {
    question: "India lies in which Continent?",
    correct: "Asia",
    options: ["Australia", "Africa", "Europe", "Asia"],
  },
  {
    question: "Oldest Mountain Range in India?",
    correct: "Aravali",
    options: ["Satpura", "Vindya", "Aravali", "Western Ghats"],
  },
];

let introContainer = document.querySelector(".intro-container");
let firstContainer = document.querySelector(".first-container");
let secondContainer = document.querySelector(".second-container");
const errorElement = document.querySelector(".error");
let questionElement = document.getElementById("number");

firstContainer.classList.add("display");
secondContainer.classList.add("display");

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  introContainer.classList.add("display");
  firstContainer.classList.remove("display");
  displayQuiz();
});
let timeElement = document.getElementById("timer");

let index = 0;
let score = 0;
let correctId = null;
let optionId = null;
let timerId = 0;
let count = 0;

function startTimer() {
  timerId = setInterval(() => {
    count++;
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    let formattedTime =
      minutes.toString().padStart(1, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    timeElement.textContent = formattedTime;
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
    modify();
  }, 60000);
}

function displayQuiz() {
  let questionIndicator = document.getElementById("number");
  let questionElement = document.getElementById("question");

  startTimer();

  questionElement.textContent = arrayList[index].question;

  let optionElement = document.getElementsByClassName("option");
  let optionArray = Array.from(optionElement);

  optionArray.map((eachOpt, indexValue) => {
    eachOpt.textContent = arrayList[index].options[indexValue];
    if (arrayList[index].options[indexValue] === arrayList[index].correct) {
      correctId = eachOpt.id;
    }
    eachOpt.addEventListener("click", optionHandler);
  });
  let nextBtn = document.getElementById("next");
  nextBtn.addEventListener("click", nextHandler);
}
function optionHandler(event) {
  let selectedOption = event.target;
  optionId = selectedOption.id;
  const errorElement = document.querySelector(".error");
  errorElement.classList.add("display");
  let optionElements = document.getElementsByClassName("option");

  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].disabled = true;
    optionElements[i].classList.remove("hover");
  }

  if (optionId === correctId) {
    selectedOption.classList.add("correct");
    score += 1;
  } else {
    selectedOption.classList.add("wrong");
    let correctOption = document.getElementById(correctId);
    correctOption.classList.add("correct");
  }
}

function nextHandler(event) {
  if (optionId === null) {
    errorElement.classList.remove("display");
  } else {
    errorElement.classList.add("display");
    questionElement.textContent = `Question: ${index + 1}/10`;
    if (index < arrayList.length - 1) {
      clearInterval(timerId);
      let optionElements = document.getElementsByClassName("option");
      for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].disabled = false;
        optionElements[i].classList.add("hover");
        optionElements[i].classList.remove("correct");
        optionElements[i].classList.remove("wrong");
      }
      optionId = null;
      index++;
      displayQuiz();
    } else {
      modify();
    }
  }
}
function modify() {
  firstContainer.classList.add("display");
  secondContainer.classList.remove("display");
  let scoreElement = document.getElementById("score");
  scoreElement.textContent = `${score}/10`;
  let progressElement = document.querySelector(".progress");
  progressElement.style.background = `linear-gradient(270deg, rgb(88, 88, 241) ${
    score * 10
  }%, rgb(179, 179, 226) ${(10 - score) * 10}%)`;
  let againBtn = document.getElementById("again");
  againBtn.addEventListener("click", () => {
    secondContainer.classList.add("display");
    firstContainer.classList.remove("display");
    index = 0;
    correctId = null;
    optionId = null;
    score = 0;
    let optionElements = document.getElementsByClassName("option");
    for (let i = 0; i < optionElements.length; i++) {
      optionElements[i].disabled = false;
      optionElements[i].classList.add("hover");
      optionElements[i].classList.remove("correct");
      optionElements[i].classList.remove("wrong");
    }
    questionElement.textContent = `Question: 0/10`;
    count = 0;
    clearInterval(timerId);
    displayQuiz();
  });
}
