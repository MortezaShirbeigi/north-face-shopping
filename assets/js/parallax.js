// Variables

// select all layer contains translate class
const translate = document.querySelectorAll(".translate");
// select logo class
const logo = document.querySelector(".logo");
// select top-section class
const topSection = document.querySelector(".top-section");
// calculate top section height
let topSection_height = topSection.offsetHeight;

// Eventlisteners

// add event to window for scroll
window.addEventListener("scroll", () => {
  // calculate vectical scroll
  let scroll = window.pageYOffset;
  // count all item countain translate class
  translate.forEach((item) => {
    // add data set speed for html
    let speed = item.dataset.speed;
    // add transform style for parallax
    item.style.transform = `translateY(${scroll * speed}px)`;
  });
  // add opacity style in scroll vertical
  logo.style.opacity = -scroll / (topSection_height / 0.7) + 1;
});
