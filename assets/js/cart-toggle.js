// Variables

// Select shopping cart
const shoppingCartBox = document.querySelector(".shopping__cart");
// Select cart button in navbar
const cartbutton = document.querySelector(".cart__button");
// Select fixed cart button bottom left
const cartButtonFixed = document.querySelector(".cart__button--fixed");

// Eventlisteners

// open shopping cart form right
cartbutton.addEventListener("click", openshoppingCartBox);
// button fixed toggle the shopping cart
cartButtonFixed.addEventListener("click", toggleshoppingCartBox);
//close shopping cart to righ
shoppingCartBox.addEventListener("click", closeshoppingCartBox);

// Functions

// opening shopping cart from right to viewport
function openshoppingCartBox(e) {
  e.preventDefault();
  shoppingCartBox.style.right = "0";
}

// close shopping cart to right
function closeshoppingCartBox(e) {
  e.preventDefault();
  if (e.target.classList.contains("close-shopping-cart")) {
    shoppingCartBox.style.right = "-900px";
  }
}

// toggle shopping cart for hide and show
function toggleshoppingCartBox(e) {
  e.preventDefault();
  if (
    shoppingCartBox.style.right === "" ||
    shoppingCartBox.style.right === "-900px"
  ) {
    shoppingCartBox.style.right = "0";
  } else {
    shoppingCartBox.style.right = "-900px";
  }
}
