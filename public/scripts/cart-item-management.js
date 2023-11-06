const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartBadgeElements = document.querySelectorAll(
  ".nav-action-list .nav-action-badge"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartItemTotalPriceElements =
  form.parentElement.querySelector(".cart-item-price");

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;
  const productid = form.dataset.productid;
  const quantity = form.firstElementChild.value;

  let response;
  const url = `/cart/items/update/${productid}`;

  try {
    response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        productid: productid,
        newQuantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("Something Went Wrong here");
      return;
    }
  } catch (error) {
    alert("Something Went Wrong");
    return;
  }

  const responseData = await response.json();

  if (responseData.updateCartData.updateItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    cartItemTotalPriceElements.textContent =
      responseData.updateCartData.updateItemPrice;
  }

  cartTotalPriceElement.textContent = responseData.updateCartData.newTotalPrice;
  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = responseData.updateCartData.newTotalQuantity;
  }
  console.log(responseData);
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
