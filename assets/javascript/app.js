// question array to pick questions from to display in html
var questionsArray = [
  {
    id: 1,
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
    id: 2,
    type: "multiple",
    difficulty: "medium",
    question: "Who was the Roman god of fire?",
    correct_answer: "Vulcan",
    incorrect_answers: ["Apollo", "Jupiter", "Mercury"]
  },
  {
    id: 3,
    type: "multiple",
    difficulty: "medium",
    question: "Neptune's greek name was...",
    correct_answer: "Poseidon",
    incorrect_answers: ["Ares", "Zeus", "Apollo"]
  },
  {
    id: 4,
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of the following Mesopotamian mythological figures was NOT a deity?",
    correct_answer: "Enkidu",
    incorrect_answers: ["Enki", "Enlil", "Enkimdu"]
  },
  {
    id: 5,
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of these Roman gods doesn't have a counterpart in Greek mythology?",
    correct_answer: "Janus",
    incorrect_answers: ["Vulcan", "Juno", "Mars"]
  },
  {
    id: 6,
    type: "multiple",
    difficulty: "medium",
    question: "In Greek Mythology, who killed Achilles?",
    correct_answer: "Paris",
    incorrect_answers: ["Hector", "Helen", "Pericles"]
  },
  {
    id: 7,
    type: "multiple",
    difficulty: "medium",
    question: "A minotaur is half human half what?",
    correct_answer: "Bull",
    incorrect_answers: ["Cow", "Horse", "Eagle"]
  },
  {
    id: 8,
    type: "multiple",
    difficulty: "medium",
    question: "According to the Egyptian Myth of Osiris, who murdered Osiris?",
    correct_answer: "Set",
    incorrect_answers: ["Horus", "Ra", "Anhur"]
  },
  {
    id: 9,
    type: "multiple",
    difficulty: "medium",
    question: "Which of the following is not one of the Greek Fates?",
    correct_answer: "Narcissus",
    incorrect_answers: ["Clotho", "Atropos", "Lachesis"]
  },
  {
    id: 10,
    type: "multiple",
    difficulty: "medium",
    question:
      "In African mythology, Anansi is a trickster and storyteller who takes the shape of which animal?",
    correct_answer: "Spider",
    incorrect_answers: ["Wild dog", "Monkey", "Crocodile"]
  },
  {
    id: 11,
    type: "boolean",
    difficulty: "medium",
    question: "Perseus defeated the Minotaur with his bare hands.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    id: 12,
    type: "boolean",
    difficulty: "medium",
    question: "Cronus was the oldest of the Titans.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    id: 13,
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
var questionIndex = 0;
var questionChoices = [];
var displayQuestion = "";
var firstRun = false;
var correct = 0;
var incorrect = 0;
var correctAnswerHeading = "Congrats you picked the right answer";
var wrongAnswerHeading = "Sorry you picked the wrong answer";

function resetTimer() {
  time = 30;
  $("#timer").text(time);
  stop();
  startTimer();
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
  // console.log(time);
  $("#timer").text(time);
  if (time === 0) {
    stop();
  }
}

function randomIndex(array) {
  var index = Math.floor(Math.random() * array.length);
  return index;
}

function getQuestion() {
  // console.log("Index selected: ", questionIndex);
  if (firstRun === false) {
    firstRun = true;
  } else {
    questionIndex++;
    questionChoices = [];
  }
  displayQuestion = questionsArray[questionIndex].question;
  console.log("questoin text:", displayQuestion);
  askedQuestions.push(questionIndex);
  console.log(askedQuestions);

  // print the question on the screen
  var newHeading = $("<h1>");
  newHeading.attr({
    class: "panel-heading",
    "data-question-id": questionsArray[questionIndex].id
  });
  newHeading.text(displayQuestion);
  $(".question").append(newHeading);

  // get choices for the selected question.
  questionsArray[questionIndex].incorrect_answers.forEach(incorrect_answers => {
    questionChoices.push(incorrect_answers);
  });
  questionChoices.push(questionsArray[questionIndex].correct_answer);
  console.log(questionChoices);

  //print the answers on the screen
  questionChoices.forEach(function(choice, index) {
    var newDiv = $("<div>");
    newDiv.attr({
      class: "form-check",
      id: "answers"
    });
    var newInput = $("<input>");
    newInput.attr({
      class: "form-check-input",
      type: "radio",
      name: "choice",
      id: index,
      value: choice
    });
    newDiv.append(newInput);
    var newLabel = $("<label>");
    newLabel.text(choice);
    newDiv.append(newLabel);
    $(".answer").append(newDiv);
  });
}

function questionResult(heading, statusText) {
  $(".modal").modal({
    show: true,
    backdrop: "static"
  });
  $(".modal-title").text(heading);
  $("#text").text(statusText);
}

function closeModal() {
  $(".modal").modal("hide");
  $(".question").empty();
  $(".answer").empty();
  getQuestion();
  resetTimer();
}

$(document).ready(function() {
  console.log("ready!");

  $("#start-game").on("click", function() {
    getQuestion();
    $("#time-label").attr("style","inline-block")
    startTimer();
    $("#start-game").hide();
    $("#next-question").show();

  });

  $("#next-question").on("click", function() {
    getQuestion();
    $(".question").empty();
    $(".answer").empty();
    resetTimer();
  });

  $(document).on("click", ".form-check-input", function() {
    // alert($( "input:checked" ).val() + " is checked!" );
    var inputID = $(this).attr("id");
    // console.log("inputID: ", inputID);
    var choiceValue = questionChoices[inputID];
    // console.log(choiceValue);
    if (questionsArray[questionIndex].correct_answer === choiceValue) {
      console.log("right choice");
      questionResult(correctAnswerHeading, choiceValue);
      stop();
      correct++;
      console.log(correct);
      setTimeout(closeModal, 2500);
    } else {
      console.log("wrong choice");
      questionResult(wrongAnswerHeading, choiceValue);
      stop();
      incorrect++;
      console.log(incorrect);
      setTimeout(closeModal, 2500);
    }
  });

  // }
});
