// Selecting all required elements
const startBtn = document.querySelector(".start_btn button");
const label = document.querySelector('.label'); // Select the label element
const image = document.querySelector('.student-image1');
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const showCorrectAnswersBtn = document.querySelector('.show_correct_answers');
const showIncorrectAnswersBtn = document.querySelector('.show_incorrect_answers');
const correctAnswersContainer = document.getElementById('correctAnswersContainer');
const incorrectAnswersContainer = document.getElementById('incorrectAnswersContainer');
const cupImage = document.querySelector('.cup-image');
const optionList = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let timeValue = 10;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let userAnswers = []; // Array to store user answers

const restartQuizBtn = resultBox.querySelector(".buttons .restart");
const quitQuizBtn = resultBox.querySelector(".buttons .quit");
const nextBtn = document.querySelector("footer .next_btn");
const bottomQuesCounter = document.querySelector("footer .total_que");

// Show info box when start button is clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
  label.classList.add('hidden');
  image.classList.add('hidden');
}

// Hide info box when exit button is clicked
exitBtn.onclick = () => {
  if (confirm("ARE YOU SURE YOU WANT TO EXIT THE QUIZ?")) {
    window.location.reload();
  }
}

// Start quiz when continue button is clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  initializeQuiz();
}

// Restart quiz when restart button is clicked
restartQuizBtn.onclick = () => {
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");
  resetQuiz();
  initializeQuiz();
}

// Reload page when quit button is clicked
quitQuizBtn.onclick = () => {
  if (confirm("ARE YOU SURE YOU WANT TO EXIT THE QUIZ?")) {
    window.location.reload();
  }
}

// Show next question when next button is clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    updateQuiz();
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
}

// Initialize the quiz with the first question and timers
function initializeQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  startTimer(timeValue);
  startTimerLine(widthValue);
  correctAnswersContainer.style.display = 'none'; // Hide correct answers box
  incorrectAnswersContainer.style.display = 'none'; // Hide incorrect answers box
}

// Reset quiz variables
function resetQuiz() {
  timeValue = 10;
  queCount = 0;
  queNumb = 1;
  userScore = 0;
  widthValue = 0;
  userAnswers = []; // Reset user answers
}

// Update the quiz with the next question and reset timers
function updateQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  nextBtn.classList.remove("show");
}

// Show questions and options
function showQuestions(index) {
  const queText = document.querySelector(".que_text");
  let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  
  // Updated option rendering to use letters (a, b, c, d)
  let optionTag = questions[index].options.map((option, idx) => {
    const letter = String.fromCharCode(97 + idx); // Convert index to letter (a, b, c, d)
    return `<div class="option"><span>${letter}) ${option}</span></div>`;
  }).join('');
  
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  optionList.querySelectorAll(".option").forEach(option => {
    option.onclick = () => optionSelected(option);
  });
}

// Handle option selection
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent.split(') ')[1]; // Extract the answer text after the letter
  let correctAns = questions[queCount].answer;
  userAnswers[queCount] = userAns; // Store the user's answer

  if (userAns === correctAns) {
    userScore++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    highlightCorrectAnswer(correctAns);
  }

  disableOptions();
  nextBtn.classList.add("show");
}

// Highlight the correct answer
function highlightCorrectAnswer(correctAns) {
  for (let i = 0; i < optionList.children.length; i++) {
    if (optionList.children[i].textContent.includes(correctAns)) {
      optionList.children[i].classList.add("correct");
      optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
    }
  }
}

// Disable all options
function disableOptions() {
  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }
}

// Show result box
function showResult() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score_text");
  let scoreTag = '';

  if (userScore > 4) {
    cupImage.setAttribute('src', 'images/gold.png');
    scoreTag = `<span>and congrats! 🎉, You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else if (userScore > 3) {
    cupImage.setAttribute('src', 'images/silver.png');
    scoreTag = `<span>and nice 😎, You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else if (userScore > 2) {
    cupImage.setAttribute('src', 'images/bronze.png');
    scoreTag = `<span>and great attempt 😊, You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else if (userScore > 1) {
    cupImage.setAttribute('src', 'images/shocked_emoji.png');
    scoreTag = `<span>and hard luck 😥, You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else if (userScore > 0) {
    cupImage.setAttribute('src', 'images/pensive_face.png');
    scoreTag = `<span>and disappointed 😔, You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else {
    cupImage.setAttribute('src', 'images/crying_emoji.png');
    scoreTag = `<span>and sorry 😭, You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  }

  scoreText.innerHTML = scoreTag;

  // Hide correct and incorrect answers containers by default
  correctAnswersContainer.style.display = 'none';
  incorrectAnswersContainer.style.display = 'none';
}

// Start the timer for the quiz
function startTimer(time) {
  counter = setInterval(() => {
    timeCount.textContent = time > 9 ? time : `0${time}`;
    time--;
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      highlightCorrectAnswer(questions[queCount].answer);
      disableOptions();
      nextBtn.classList.add("show");
    }
  }, 1000);
}

function startTimerLine(time) {
  const totalTime = 10000; // Total time for the timer in milliseconds (10 seconds)
  const intervalTime = 100; // Update every 100 milliseconds
  counterLine = setInterval(() => {
    time += intervalTime; // Increment time by the interval time
    let progressPercentage = (time / totalTime) * 100; // Calculate the progress percentage
    timeLine.style.width = `${progressPercentage}%`; // Update the width of the timer line
    if (time >= totalTime) {
      clearInterval(counterLine); // Clear the interval when the total time is reached
    }
  }, intervalTime);
}

// Update the question counter
function queCounter(index) {
  let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
  bottomQuesCounter.innerHTML = totalQueCounTag;
}

// Tick and cross icons
const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Get references to the buttons and answer containers
showCorrectAnswersBtn.onclick = () => {
  correctAnswersContainer.style.display = 'block'; // Show correct answers box
  incorrectAnswersContainer.style.display = 'none'; // Hide incorrect answers box
  showResults(); // Call to show results when correct answers button is clicked
};

// Show incorrect answers when the button is clicked
showIncorrectAnswersBtn.onclick = () => {
  incorrectAnswersContainer.style.display = 'block'; // Show incorrect answers box
  correctAnswersContainer.style.display = 'none'; // Hide correct answers box
  showResults(); // Call to show results when incorrect answers button is clicked
};

// Function to show correct and incorrect answers
function showResults() {
  const correctAnswersContainerList = document.querySelector('.correct_answers_list');
  const incorrectAnswersContainerList = document.querySelector('.incorrect_answers_list');

  // Clear previous results
  correctAnswersContainerList.innerHTML = '';
  incorrectAnswersContainerList.innerHTML = '';

  // Initialize counters
  let correctCount = 0;
  let incorrectCount = 0;

  // Loop through questions and user answers
  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index] || 'No answer';
    const questionNumber = question.numb; // Get the question number
    const questionText = question.question; // Get the question text
    const correctAnswer = question.answer; // Get the correct answer

    // Find the index of the user's answer and the correct answer
    const userAnswerIndex = question.options.indexOf(userAnswer);
    const correctAnswerIndex = question.options.indexOf(correctAnswer);

    // Convert indices to letters (a, b, c, d)
    const userAnswerLetter = userAnswerIndex !== -1 ? String.fromCharCode(97 + userAnswerIndex) : 'N/A'; // 'N/A' if no answer
    const correctAnswerLetter = correctAnswerIndex !== -1 ? String.fromCharCode(97 + correctAnswerIndex) : 'N/A'; // 'N/A' if no answer

    // Format the output
    const answerText = `<strong>Question ${questionNumber}. ${questionText}</strong><br><strong>Your Answer :</strong> ${userAnswerLetter}) ${userAnswer}<br><strong>Correct Answer :</strong> ${correctAnswerLetter}) ${correctAnswer}<br><br>`;

    if (userAnswer === correctAnswer) {
      // If the answer is correct
      const correctAnswerItem = document.createElement('div');
      correctAnswerItem.innerHTML = answerText; // Use innerHTML to allow line breaks
      correctAnswersContainerList.appendChild(correctAnswerItem);
      correctCount++; // Increment correct answer count
    } else {
      // If the answer is incorrect
      const incorrectAnswerItem = document.createElement('div');
      incorrectAnswerItem.innerHTML = answerText; // Use innerHTML to allow line breaks
      incorrectAnswersContainerList.appendChild(incorrectAnswerItem);
      incorrectCount++; // Increment incorrect answer count
    }
  });

  // Display counts if no answers were found
  if (correctCount === 0) {
    correctAnswersContainerList.innerHTML = '<strong style="text-align: center; display: block;">0 Correct Answers</strong>';
  }

  if (incorrectCount === 0) {
    incorrectAnswersContainerList.innerHTML = '<strong style="text-align: center; display: block;">0 Incorrect Answers</strong>';
  }
}

// Call the function to show the box
window.onload = function() {
  // You can remove this if you don't want to show correct answers on load
  // showCorrectAnswers(); 
};