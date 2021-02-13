/* Put your javascript in here */
const array1 = [];

for (let i = 0; i < document.querySelectorAll(".slider div").length; i++) {
  slideArray.push(
    document.querySelectorAll(".slider div")[i].dataset.background
  );
}

let currentSlideIndex = -1;
function advanceSliderItem() {
  currentSlideIndex++;
  if (currentSlideIndex >= slideArray.length) {
    currentSlideIndex = 0;
  }
}

let intervalID = setInterval(advanceSliderItem, 3000);

function fowardSlide() {
  slides[currentSlide].className = "slide";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "slide showing";
}

function backSlide() {
  slides[currentSlide].className = "slide";
  currentSlide = (currentSlide - 1) % slides.length;

  if (currentSlide == -1) {
    currentSlide = slides.length - 1;
  }
  slides[currentSlide].className = "slide showing";
}

forwardButton.addEventListener("click", () => {
  forwardSlide();
});

backButton.addEventListener("click", () => {
  backSlide();
});
