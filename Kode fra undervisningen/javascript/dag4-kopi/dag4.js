//objekt
const person1 = {
  email: "jrs@ek.dk",
  firstname: "Jeppe",
  lastname: "Stockmar",
  age: 19,
};

const person2 = {
  email: "kirs@ek.dk",
  firstname: "Christian",
  lastname: "Kirschberg",
  age: 16,
};

//Array
const personer = []; // tom liste
personer.push(person1);
personer.push(person2);

personer.forEach((person) => {
  visNavn(person);
});

//Funktion 1
function visNavn(person) {
  document.getElementById("indhold1").textContent =
    "Hej" + " " + person.firstname;
}

visNavn(person2);

//Funktion 2
function fullName(person) {
  document.getElementById("indhold2").textContent =
    "Hej" + " " + person.firstname + " " + person.lastname;
}
fullName(person2);

//Funktion 3

function erPersonMyndig(person) {
  let greeting;

  if (person.age >= 18) {
    greeting = "Ja" + " " + person.firstname + " " + "er" + " " + "myndig!";
  } else if (person.age <= 18) {
    greeting =
      "Nej" +
      " " +
      person.firstname +
      " " +
      "er" +
      " " +
      "ikke" +
      " " +
      "myndig!";
  }

  document.getElementById("indhold3").innerHTML = greeting;
}
erPersonMyndig(person1);

//Vejr øvelse
async function getWeather() {
  const response = await axios.get(
    "https://65ddd3abdccfcd562f558d61.mockapi.io/api/v1/forecast/5",
  );
  return response.data;
}

async function writeWeatherToHTML() {
  const weather = await getWeather();
  document.getElementById("indhold4").textContent =
    "Forhold:" +
    " " +
    weather.sky +
    " " +
    "Temperatur:" +
    " " +
    weather.temperature +
    " " +
    "Nedbør:" +
    " " +
    weather.rain_mm +
    "mm";
}
writeWeatherToHTML();
