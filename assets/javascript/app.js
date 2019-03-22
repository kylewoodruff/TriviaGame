// question array to pick questions from to display in html
var questionsArray = [
  {
    type: "multiple",
    difficulty: "medium",
    question:
      "According to Algonquian folklore, how does one transform into a Wendigo?",
    correct_answer: "Participating in cannibalism.",
    incorrect_answers: [
      "Excessive mutilation of animal corpses.",
      "Performing a ritual involving murder.",
      "Drinking the blood of many slain animals."
    ]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question: "Who was the Roman god of fire?",
    correct_answer: "Vulcan",
    incorrect_answers: ["Apollo", "Jupiter", "Mercury"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question: "Neptune's greek name was...",
    correct_answer: "Poseidon",
    incorrect_answers: ["Ares", "Zeus", "Apollo"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of the following Mesopotamian mythological figures was NOT a deity?",
    correct_answer: "Enkidu",
    incorrect_answers: ["Enki", "Enlil", "Enkimdu"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of these Roman gods doesn't have a counterpart in Greek mythology?",
    correct_answer: "Janus",
    incorrect_answers: ["Vulcan", "Juno", "Mars"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question: "In Greek Mythology, who killed Achilles?",
    correct_answer: "Paris",
    incorrect_answers: ["Hector", "Helen", "Pericles"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question: "A minotaur is half human half what?",
    correct_answer: "Bull",
    incorrect_answers: ["Cow", "Horse", "Eagle"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question: "According to the Egyptian Myth of Osiris, who murdered Osiris?",
    correct_answer: "Set",
    incorrect_answers: ["Horus", "Ra", "Anhur"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question: "Which of the following is not one of the Greek Fates?",
    correct_answer: "Narcissus",
    incorrect_answers: ["Clotho", "Atropos", "Lachesis"]
  },
  {
    type: "multiple",
    difficulty: "medium",
    question:
      "In African mythology, Anansi is a trickster and storyteller who takes the shape of which animal?",
    correct_answer: "Spider",
    incorrect_answers: ["Wild dog", "Monkey", "Crocodile"]
  },
  {
    type: "boolean",
    difficulty: "medium",
    question: "Perseus defeated the Minotaur with his bare hands.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    type: "boolean",
    difficulty: "medium",
    question: "Cronus was the oldest of the Titans.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    type: "boolean",
    difficulty: "Medium",
    question: "Eros (Cupid) is the son of Aphrodite.",
    correct_answer: "True",
    incorrect_answers: ["False"]
  }
];
// time varible to store count of time passed
var time = 30;
// boolean to determine when to start timer
var timerRunning = false;
// variable to store interal id for the interval function
var intervalId;
var askedQuestions = [];
var questionIndex;
var questionChoices = [];
var displayQuestion;

function resetTimer() {
  time = 30;
  $("#timer").text(time);
}

function startTimer() {
  if (!timerRunning) {
    intervalId = setInterval(counter, 1000);
    timerRunning = true;
  }
  $("#timer").text(time);
}

function stop() {
  clearInterval(intervalId);
  timerRunning = false;
}

function counter() {
  time--;
  console.log(time);
  $("#timer").text(time);
  if (time === 0) {
    stop();
  }
}

function randomIndex() {
  var index = Math.floor(Math.random() * questionsArray.length);
  // console.log(index);
  return index;
}

function getQuestion() {
  questionIndex = randomIndex();
  console.log("Index of questionsArray:", questionIndex);
  displayQuestion = questionsArray[questionIndex].question;
  console.log("questoin text:", displayQuestion);
  askedQuestions.push(questionIndex);
  console.log(askedQuestions);
  getChoices();
}

function getChoices() {
  questionsArray[questionIndex].incorrect_answers.forEach(incorrect_answers => {
    questionChoices.push(incorrect_answers);
  });
  questionChoices.push(questionsArray[questionIndex].correct_answer);
  console.log(questionChoices);
}

function nextQuestion() {
  questionIndex = "";
  questionChoices = [];
  displayQuestion = "";
  getQuestion();
}

$(document).ready(function() {
  console.log("ready!");
  // startTimer();
  getQuestion();

  // randomIndex();

  var newHeading = $("<h1>");
  newHeading.attr({
    class: "panel-heading",
    "data-question-id": questionIndex
  });

  $(".btn").on("click", function(){
    nextQuestion();
  })

  // $(".question").append(newHeading)

  var newP = $("<p>");

  // $(".question").text(displayQuestion);
});
