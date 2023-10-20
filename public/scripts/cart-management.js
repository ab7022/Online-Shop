document.addEventListener("DOMContentLoaded", function () {
    const cartBadgeElement = document.querySelector(".nav-item .badge");

    function updateCartBadge(newTotalQuantity) {
        cartBadgeElement.textContent = newTotalQuantity;
    }

    document.querySelectorAll(".btn[data-productid]").forEach(addCartButtonElement => {
        addCartButtonElement.addEventListener("click", async () => {
            console.log("Button Clicked");

            // Retrieve the productid attribute using dataset
            const prodId = addCartButtonElement.dataset.productid;
            console.log("Product ID:", prodId);

            // Log the URL being used in the fetch request
            const url = `/cart/items/${prodId}`;
            console.log("Fetch URL:", url);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({ prodId: prodId }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const newTotalQuantity = responseData.newTotalItems;
                    updateCartBadge(newTotalQuantity);
                } else {
                    alert("Something Very Wrong");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something Went Wrong!");
            }
        });
    });
});
