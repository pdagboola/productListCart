const addToCart = document.querySelectorAll(".add-to-cart");
const deserts = document.querySelectorAll(".item-box");
const price = document.querySelectorAll(".price");
const cartContainer = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const desertName = document.querySelectorAll(".desert-name");
const itemAdded = document.querySelector(".item-added");
const totalOrderValue = document.querySelector(".total-order-value");
const confirmDialog = document.querySelector(".confirm-order");
const confirmButton = document.querySelector(".confirm");
const dialog = document.querySelector(".dialog");
const confirmIcon = document.querySelector("confirm-icon");
const overlay = document.querySelector(".overlay");
const desertImg = document.querySelectorAll(".desert-img");
const dialogDiv = document.querySelector(".dialog-div");

let clickCounts = Array(addToCart.length).fill(0);

for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", function () {
    clickCounts[i]++;
    cartContent.classList.remove("hidden");

    let existingItem = itemAdded.querySelector(
      `.desert-name-new[data-index="${i}"]`
    );
    let priceFaintValue = parseFloat(price[i].textContent.replace("$", ""));

    if (existingItem) {
      let repElement = existingItem.parentElement.querySelector(".rep");
      repElement.textContent = `${clickCounts[i]}x`;
      let priceTotalElement =
        existingItem.parentElement.querySelector(".price-total span");
      priceTotalElement.textContent = (
        priceFaintValue * clickCounts[i]
      ).toFixed(2);
    } else {
      const initialTotalPrice = (priceFaintValue * clickCounts[i]).toFixed(2);
      const priceCartContainer = document.createElement("div");
      priceCartContainer.className = "new-item-added";
      priceCartContainer.innerHTML = `
        <div class="price-cart">
          <img src="${desertImg[i].src}" class="hidden new-desert-image"/>
          <h3 class="desert-name-new" data-index="${i}">${desertName[i].textContent}</h3>
          <div class="price-rep">
            <p class="rep">${clickCounts[i]}x</p>
            <p class="price-faint">@ <span>${price[i].textContent}</span></p>
            <p class="price-total">$<span>${initialTotalPrice}</span></p>
          </div>
        </div>
        <div class="cancel-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
          </svg>
        </div>
      `;
      itemAdded.appendChild(priceCartContainer);

      const removeButton = priceCartContainer.querySelector(".cancel-icon");
      removeButton.addEventListener("click", function () {
        itemAdded.removeChild(priceCartContainer);
        clickCounts[i] = 0;
        updateTotalOrderValue();
        if (itemAdded.children.length === 0) {
          cartContent.classList.add("hidden");
          document.querySelector(".illustration").classList.remove("hidden");
        }
      });
    }

    updateTotalOrderValue();
    document.querySelector(".illustration").classList.add("hidden");
  });
}

function updateTotalOrderValue() {
  let totalValue = 0;
  const priceTotals = itemAdded.querySelectorAll(".price-total span");
  priceTotals.forEach((priceTotal) => {
    totalValue += parseFloat(priceTotal.textContent);
  });
  totalOrderValue.textContent = totalValue.toFixed(2);
}

function generateOrderSummary() {
  deserts.forEach((desert) => {
    let newImage = desert.querySelector(".desert-img").src;
    // console.log(newImage);
  });
  let orderSummary =
    "<div class='order-summary-new'><img class='confirm-icon' src='/assets/images/icon-order-confirmed.svg'/><h1 class='order-confirmed'>Order Confirmed</h1><p class='we-hope'>We hope you enjoy your food!</p></div>";
  const items = itemAdded.querySelectorAll(".new-item-added");
  console.log(items);

  items.forEach((item) => {
    const name = item.querySelector(".desert-name-new").textContent;
    const quantity = item.querySelector(".rep").textContent;
    const totalPrice = item.querySelector(".price-total span").textContent;
    const imageSource = item.querySelector(".new-desert-image").src;
    const priceRate = item.querySelector(".price-faint").textContent;

    orderSummary += `
      <div class="order-summary-item">
          
          <div class="name-details">
            <div class="new-image-container">
              <div class="new-image-quantity">
                <img class="image-dialog" src="${imageSource}"/>
                <div class="name-rate">
                
                  <h4>${name}</h4>
                  <div class="new-quantity">
                    <p class="new-quantity-p-one">${quantity}</p>
                    <p class="new-quantity-p-two">${priceRate}</p>
                  </div>
                </div>
                
              </div>
              <p class="total-price">$${totalPrice}</p>
            </div>
          </div>
      </div>
    `;
  });
  return orderSummary;
}
//   for (let i = 0; i < deserts.length; i++) {
//     const image = desertImg[i];
//     console.log(desertImg[i]);
//     console.log(desertName[i]);

//     orderSummary += `
//       <div class="order-summary-item">

//     <div>${desertImg[i]}</div>
//    <div class="name-details">
//     <h4>${desertName[i].textContent}</h4>
//           <div class="new-quantity">

//           </div>
//           <div>

//           </div>
//         </div>
//     </div>
//   `;
//   }
//   return orderSummary;
// }

confirmButton.addEventListener("click", () => {
  console.log(desertImg);
  dialog.classList.remove("hidden");
  overlay.classList.toggle("hidden");
  const summary = generateOrderSummary();
  dialog.show();
  dialog.innerHTML = summary;
  dialog.innerHTML += `<div class="order-total-dialog"><div class="order-total-dialog-value"><p>Order Total</p> <h2>$${totalOrderValue.textContent}</h2></div><button class="start-new-order">Start New Order</button></div>`;
  const startNewOrder = document.querySelector(".start-new-order");
  startNewOrder.addEventListener("click", () => {
    itemAdded.innerHTML = "";
    dialog.close();
    dialog.innerHTML = "";
    overlay.classList.toggle("hidden");
    dialog.classList.toggle("hidden");
    cartContent.classList.toggle("hidden");
    document.querySelector(".illustration").classList.toggle("hidden");
    clickCounts = Array(addToCart.length).fill(0);
    updateTotalOrderValue();
  });
});
