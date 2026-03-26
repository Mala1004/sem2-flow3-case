const firstname = "Christian";
const lastname = "Kirschberg";

const fullname = firstname + " " + lastname; // string concatenation
const myHeight = 1.8; // meter

const number1 = 2; // number
const number2 = 4; // number

console.log(number2 + number1);

console.log(fullname);

console.log(fullname.length);

console.log(fullname.toLowerCase());

const countFoodInFridge = 0;
const doIHaveFood = countFoodInFridge > 0;

console.log(doIHaveFood);

//document.querySelector("#clickButton") // udvælger et element fra DOM'en

// function som hedder handleClick
function handleClick() {
  const count = document.getElementById("count").textContent;
  const newCount = Number(count) + 1;

  console.log(newCount); // skrive i console
  document.getElementById("count").textContent = newCount; // ændrer html dokumentet.
}

// tilføjer vi en event-listener på knappen, og kalder handleClick funktionen når man klikker.
//(click) navnet på det event vi lytter på
document.getElementById("clickButton").addEventListener("click", handleClick);

const likeButton = document.getElementById("likeButton"); // gemme ref. til like button så kan jeg bruge den 2 gange.
likeButton.addEventListener("click", function () {
  // tilføj event listener til knappen og lytter på click
  likeButton.classList.toggle("liked"); // toggle css klassen liked på knappen selv.
});

document.getElementById("showButton").addEventListener("click", function () {
  document.getElementById("moreText").classList.toggle("hidden");
});

function handleAddTodo() {
  const input = document.getElementById("todoText");
  const todoText = input.value; // læser det brugeren har skrevet i input feltet
  const li = document.createElement("li"); // opretter et nyt li-element
  li.textContent = todoText;
  document.getElementById("todos").appendChild(li);
  input.value = "";
}

const btnAddTodo = document.getElementById("btnAddTodo");
btnAddTodo.addEventListener("click", handleAddTodo);

document
  .getElementById("todoText")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  });

// Js - objekt
// Samling af data

//objekt
const teacher1 = {
  email: "jrs@ek.dk",
  firstname: "Jeppe",
  lastname: "Stockmar",
};

const teacher2 = {
  email: "kirs@ek.dk",
  firstname: "Christian",
  lastname: "Kirschberg",
};

//.                   teacher er et navn som jeg har valgt her
function printTeacher(teacher) {
  document.getElementById("pTeacher").textContent =
    "Hej " +
    teacher.firstname +
    " " +
    teacher.lastname +
    " din email er " +
    teacher.email +
    " hvis du er for gammel til at huske den";
}

printTeacher(teacher1);

//----------QUIZ----------
//Spørgsmål 1 (i objekt, så det indeholde spørgsmål og svar seperat)
const quiz1 = {
  questions: "Hvem er jeg?",
  answers: "Marco Larsen",
};
//Spørgsmål 2 (i objekt, så det indeholde spørgsmål og svar seperat)
const quiz2 = {
  questions: "Hvem er du?",
  answers: "Stadig Marco Larsen",
};

//Funktion der giver et af spørgsmålene, til det  p-elementet
function giveQuiz(quiz) {
  document.getElementById("question").textContent = quiz.questions;
  document.getElementById("answer").textContent = quiz.answers;
}

//Funktion der giver 1 af svarene, når der clickes på knappen
document.getElementById("btnShow").addEventListener("click", function () {
  document.getElementById("answer").classList.toggle("hidden");
});

// Beder om et spørgsmål + tilhørende svar
giveQuiz(quiz2);
