function switchLights() {
  // udvælg elementer i html-siden til senere brug
  const redLight = document.querySelector("#red");
  const yellowLight = document.querySelector("#yellow");
  const greenLight = document.querySelector("#green");

  // Definerer konstante spørgsmål, der undersøger om lamperne er aktive
  const isRedActive = redLight.classList.contains("active");
  const isYellowActive = yellowLight.classList.contains("active");
  const isGreenActive = greenLight.classList.contains("active");

  // Bruger spørgsmålene, defineret ovenover
  //Hvis rød lampe er aktiv
  if (isRedActive) {
    //Tilføj active class til gul
    yellowLight.classList.add("active");
    //Fjern active class fra rød
    redLight.classList.remove("active");
    // Hvis gul lampe er aktiv
  } else if (isYellowActive) {
    ////Fjern active class fra gul
    yellowLight.classList.remove("active");
    //Tilføj active class til grøn
    greenLight.classList.add("active");
    //Hvis intet af ovennævnte er tilfældet:
  } else {
    // Tilføj active class til rød
    redLight.classList.add("active");
    //Fjern active class fra grøn
    greenLight.classList.remove("active");
  }
}

// Tilknyt event-listener på at brugeren trykker på knappen
document.getElementById("change-light").addEventListener("click", switchLights);
