// Questions for quiz
const questions = [
  {
      numb: 1,
      question: "What does HTML stand for?",
      answer: "Hyper Text Markup Language",
      options: [
        "Hyper Text Markup Language",
        "Hyperlink and Text Markup Language",
        "Hyper Text Multi Language",
        "Hyper Text Management Language"
      ]
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
  {
    numb: 3,
    question: "What does JSON stand for?",
    answer: "JavaScript Object Notation",
    options: [
      "JavaScript Object Notation",
      "JavaScript Online Notation",
      "Java Standard Object Notation",
      "JavaScript Object Name"
    ]
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
  {
    numb: 5,
    question: "What does SEO stand for?",
    answer: "Search Engine Optimization",
    options: [
      "Search Engine Optimization",
      "Search Engine Operation",
      "Search Engine Organization",
      "Search Engine Output"
    ]
  },
];

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Shuffle options for each question
questions.forEach(question => {
    shuffleArray(question.options);
});

// Output the shuffled questions
console.log(questions);

// Function to display questions and options
function displayQuestion(question) {
  console.log(`Question ${question.numb}: ${question.question}`);
  question.options.forEach((option, index) => {
    const letter = String.fromCharCode(97 + index); // 97 is the ASCII code for 'a'
    console.log(`${letter}) ${option}`);
  });
}

// Display all questions
questions.forEach(displayQuestion);