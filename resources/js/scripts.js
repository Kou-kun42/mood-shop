import data from "./data.js";

const itemsContainer = document.getElementById("items");
const itemList = document.getElementById("item-list");
const cartQty = document.getElementById("cart-qty");
const cartTotal = document.getElementById("cart-total");

// the length of our data determines how many times this loop goes around
data.forEach(function (data, index) {
  // create a new div element and give it a class name
  let newDiv = document.createElement("div");
  newDiv.className = "item";

  // create an image element
  let img = document.createElement("img");
  // this will change each time we go through the loop. Can you explain why?
  img.src = data.image;
  img.width = 300;
  img.height = 300;

  // Add the image to the div
  newDiv.appendChild(img);
  // put new div inside items container
  itemsContainer.appendChild(newDiv);

  let price = document.createElement("p");
  let description = document.createElement("p");
  let button = document.createElement("button");

  price.innerText = data.price;
  description.innerText = data.desc;

  newDiv.appendChild(description);
  newDiv.appendChild(price);

  button.id = data.name;

  // creates a custom attribute called data-price. That will hold price for each element in the button
  button.dataset.price = data.price;
  button.innerHTML = "Add to Cart";
  newDiv.appendChild(button);
});

const all_items_button = Array.from(document.querySelectorAll("button"));

all_items_button.forEach((elt) =>
  elt.addEventListener("click", () => {
    addItem(elt.getAttribute("id"), elt.getAttribute("data-price"));
    showItems();
  })
);

const cart = [];

function addItem(name, price) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty++;
      return;
    }
  }
  const item = { name, price, qty: 1 };
  cart.push(item);
}

function showItems() {
  // console.log(`You have ${getQty()} items in your cart`);
  cartQty.innerHTML = `You have ${getQty()} items in your cart`;

  let itemStr = "";

  for (let i = 0; i < cart.length; i++) {
    // console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
    const { name, price, qty } = cart[i];
    itemStr += `<li>${name} $${price} x ${qty} = ${qty * price}</li>`;
  }

  itemList.innerHTML = itemStr;

  // console.log(`Total in cart: $${getTotal()}`);
  cartTotal.innerHTML = `Total in cart: $${getTotal()}`;
}

function getQty() {
  let qty = 0;
  for (let i = 0; i < cart.length; i++) {
    qty += cart[i].qty;
  }
  return qty;
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2);
}

function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (qty > 0) {
        cart[i].qty -= qty;
      }

      if (cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1);
      }
      return;
    }
  }
}
