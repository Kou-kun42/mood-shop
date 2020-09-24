import data from "./data.js";

const itemsContainer = document.getElementById("items");

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

const cart = [];

function addItem(name, price) {
  const item = { name: name, price: price, qty: 1 };
  cart.push(item);
}

function showItems() {}
