// variables

// select products section
const products = document.querySelector(".products__section");
// select shopping cart content for items
const shoppingCartContent = document.querySelector(".shopping__cart--content");
// select clear cart in shopping cart
const clearCart = document.querySelector(".clear__cart");
// select fixed cart button in bottom left
const cartBtnFixed = document.querySelector(".cart__button--fixed");
// products cart
let cart = getFromLocalStorage();

// Eventlisteners

// add event for add to cart button
products.addEventListener("click", addToCart);
// add event for clear cart
clearCart.addEventListener("click", clearAllProduct);
// add event for add and rmove product in shopping cart
shoppingCartContent.addEventListener("click", productChange);
// show fixed cart button in scroll
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 600) {
    cartBtnFixed.classList.remove("hideBtn");
  } else {
    cartBtnFixed.classList.add("hideBtn");
  }
});

// Functions
// render cart array
renderCart();
// render cart and show to shopping cart
function renderCart() {
  // empty shopping cart html before render
  shoppingCartContent.innerHTML = "";
  // search in cart array for count products
  cart.map((product) => {
    // create table for print in html
    createProductDom(product);
  });
  // change color of cart btn fixed when product in cart
  if (cart.length > 0) {
    cartBtnFixed.style.color = "#DE1325";
  } else {
    cartBtnFixed.style.color = "#000000";
  }
}

// add product to cart array
function addToCart(e) {
  if (e.target.classList.contains("add-to-cart")) {
    const product = e.target.parentElement;
    const productInfo = {
      img: product.querySelector("img").src,
      title: product.querySelector("h4").textContent,
      price: product.querySelector("p").textContent.substring(1),
      total: product.querySelector("p").textContent.substring(1),
      quantity: 1,
      id: product.querySelector("button").getAttribute("data-id"),
    };
    productExist(productInfo);
    cart.push(productInfo);
    renderCart();
    cartBtnAnimation();
    addProductToLocalStorage();
  }
}

// create product tag for show in DOM
function createProductDom(product) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="align-middle"><img class="img-fluid" src="${product.img}" alt="" width="50px">${product.title}</td>
    <td class="align-middle">$${product.price}</td>
    <td class="align-middle"><a class="minus" href="#"><i class="fa fa-minus-circle"></i></a><span class="px-2">${product.quantity}</span><a class="plus" href="#"><i class="fa fa-plus-circle"></i></a></td>
    <td class="align-middle">$${product.total}</td>
    <td class="align-middle"><a class="remove" data-id="${product.id}" href="#"><i class="fa fa-times remove"></i></a></td>
    `;
  shoppingCartContent.appendChild(row);
}

// check your product for quantity in shopping cart
function productExist(product) {
  cart.map((item, index) => {
    if (item.id === product.id) {
      let total = 0;
      product.total = Number(item.total);
      product.quantity = Number(item.quantity);
      cart.splice(index, 1);
      product.quantity++;
      total = Number(product.total) + Number(product.price);
      product.total = total.toFixed(2);
    }
  });
}

// clear all products from shopping cart
function clearAllProduct() {
  cart = [];
  renderCart();
  localStorage.clear();
}

// remove, increase, decrease products in cart
function productChange(e) {
  if (e.target.classList.contains("remove")) {
    productId = e.target.parentElement.getAttribute("data-id");
    // remove product
    cart.map((item, index) => {
      if (item.id === productId) {
        cart.splice(index, 1);
        // removeProductFromLocalStorage(productId)
      }
    });
    renderCart();
    addProductToLocalStorage();
  }
  // increase product in cart
  if (e.target.classList.contains("fa-plus-circle")) {
    const product = e.target.closest("tr");
    const productId = product.children[4].children[0].getAttribute("data-id");
    cart.map((item) => {
      if (item.id === productId) {
        item.quantity++;
        total = Number(item.total) + Number(item.price);
        item.total = total.toFixed(2);
      }
    });
    renderCart();
    cartBtnAnimation();
    addProductToLocalStorage();
  }
  // decrease product in cart
  if (e.target.classList.contains("fa-minus-circle")) {
    const product = e.target.closest("tr");
    const productId = product.children[4].children[0].getAttribute("data-id");
    cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity--;
        total = Number(item.total) - Number(item.price);
        item.total = total.toFixed(2);
      }
    });
    renderCart();
    addProductToLocalStorage();
  }
}
// get products fotm localstorage to cart array
function getFromLocalStorage() {
  const productJSON = localStorage.getItem("products");
  return productJSON !== null ? JSON.parse(productJSON) : [];
}
// add products in cart in local storage
function addProductToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(cart));
}

// animation for fixed cart button after add product to cart
function cartBtnAnimation() {
  cartBtnFixed.classList.add("cart__button--fixed__buzz");
  setTimeout(() => {
    cartBtnFixed.classList.remove("cart__button--fixed__buzz");
  }, 300);
}
