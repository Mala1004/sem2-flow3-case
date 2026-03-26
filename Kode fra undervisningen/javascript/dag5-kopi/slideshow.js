//Slides er et navn på et array af information
const slides = document.querySelectorAll(".slide");

//Skjuler alle billeder. CurrentIndex = 0. de 3 fotos hedder 0, 1 og 2
let currentIndex = 0;

function displayImageNumber(displayNumber) {
  currentIndex = displayNumber;
  //En regel der gælder for alle der er i det array der hedder "slides"
  slides.forEach((slide) => {
    //Skjuler elementerne
    slide.style.display = "none";
  });
  //Spørger hvor mange elementer der er i det array der hedder "slides"
  const numberOfImages = slides.length;
  //Hvis "currentIndex værdien overstiger antallet af billeder, starter den forfra"
  if (currentIndex > numberOfImages - 1) {
    currentIndex = 0;
    //Hvis "currentIndex værdien falder under 0, går den til "numberOfImages - 1", altså det sidste billede.
  } else if (currentIndex < 0) {
    currentIndex = numberOfImages - 1;
  }

  slides[currentIndex].style.display = "block";
}
displayImageNumber(0);

//Eventlistener til pilene/knapperne, der skifter imellem fotos
document.querySelector(".next").addEventListener("click", () => {
  displayImageNumber(currentIndex + 1);
});
document.querySelector(".previous").addEventListener("click", () => {
  displayImageNumber(currentIndex - 1);
});
