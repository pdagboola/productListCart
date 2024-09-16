const addToCart = document.querySelectorAll(".add-to-cart");
const deserts = document.querySelectorAll(".item-box");
const price = document.querySelectorAll(".price");
const cartContainer = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const priceFaint = document.querySelector(".price-faint");
const priceTotal = document.querySelector(".price-total");
const desertName = document.querySelectorAll(".desert-name");
const newDesertName = document.querySelector(".desert-name-new");
const itemAdded = document.querySelector(".item-added");
console.log(price[0]);
console.log(cartContent);

// for (let desert of desertArray) {
// }
// console.log(cart.dataset.key);

// for (let cart of addToCart) {
//   let value = cart.dataset.key;
//   console.log(cart);
//   cart.addEventListener("click", () => {
//     console.log(value);
//     if (value === "0") {
//       let newOutput = price[0];

//       cartContainer.innerHTML = newOutput;
//       return cartContainer;
//       console.log(price[0]);
//     } else if (value == "1") {
//       let newOutput = price[1];
//       console.log(newOutput);
//       cartContainer.innerHTML = newOutput;
//       console.log(value);
//       console.log(price[0]);
//     }
//   });
// }
for (let i = 0; i < addToCart.length; i++) {
  // console.log(addToCart);
  addToCart[i].addEventListener("click", function () {
    // console.log("click");
    // console.log(price[i].textContent);
    cartContent.classList.remove("hidden");

    // newDesertName.innerText = desertName[i].textContent;
    // priceTotal.innerText = price[i].textContent;
    // priceFaint.innerText = price[i].textContent;
    const priceCartContainer = document.createElement("div");
    priceCartContainer.className = "new-item-added";
    priceCartContainer.innerHTML = `
            <div class="price-cart">
              <h3 class="desert-name-new">${desertName[i].textContent}</h3>
              <div class="price-rep">
                <p class="rep">1x</p>
                <p class="price-faint">@ <span>${price[i].textContent}</span></p>
                <p class="price-total"><span>${price[i].textContent}</span></p>
              </div>
            </div>
            <div class="cancel-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#CAAFA7"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </div>
          `;

    document.querySelector(".illustration").classList.add("hidden");

    // Create an array to keep track of the click count for each item
    let clickCounts = Array(addToCart.length).fill(0);

    for (let i = 0; i < addToCart.length; i++) {
      addToCart[i].addEventListener("click", function () {
        // Increment the click count for the current item
        clickCounts[i]++;

        // Check if the item is already in the cart
        let existingItem = itemAdded.querySelector(
          `.desert-name-new[data-index="${i}"]`
        );

        if (existingItem) {
          // Update the click count in the .rep element
          let repElement = existingItem.parentElement.querySelector(".rep");
          repElement.textContent = `${clickCounts[i]}x`;

          // Update the total price in the .price-total element
          let priceFaintValue = parseFloat(
            price[i].textContent.replace("$", "")
          );
          let priceTotalElement =
            existingItem.parentElement.querySelector(".price-total span");
          priceTotalElement.textContent = (
            priceFaintValue * clickCounts[i]
          ).toFixed(2);
        } else {
          // If the item is not in the cart, add it with the initial count and calculate the price
          const priceFaintValue = parseFloat(
            price[i].textContent.replace("$", "")
          );
          const initialTotalPrice = (priceFaintValue * clickCounts[i]).toFixed(
            2
          );

          const priceCartContainer = document.createElement("div");
          priceCartContainer.className = "new-item-added";
          priceCartContainer.innerHTML = `
        <div class="price-cart">
          <h3 class="desert-name-new" data-index="${i}">${desertName[i].textContent}</h3>
          <div class="price-rep">
            <p class="rep">${clickCounts[i]}x</p>
            <p class="price-faint">@ <span>${price[i].textContent}</span></p>
            <p class="price-total"><span>${initialTotalPrice}</span></p>
          </div>
        </div>
        <div class="cancel-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 10 10"
          >
            <path
              fill="#CAAFA7"
              d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
            />
          </svg>
        </div>
      `;

          itemAdded.appendChild(priceCartContainer);

          // Add event listener to the remove button (cancel-icon)
          const removeButton = priceCartContainer.querySelector(".cancel-icon");
          removeButton.addEventListener("click", function () {
            itemAdded.removeChild(priceCartContainer);
            clickCounts[i] = 0; // Reset the click count for the item

            // Optional: Check if the cart is empty and hide the cart content if so
            if (itemAdded.children.length === 0) {
              cartContent.classList.add("hidden");
              document
                .querySelector(".illustration")
                .classList.remove("hidden");
            }
          });
        }

        document.querySelector(".illustration").classList.add("hidden");
      });
    }

    // Number(
    //   (document.querySelector(".cart-number").textContent += price.length)
    // );
  });
}
