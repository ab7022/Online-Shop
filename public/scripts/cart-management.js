document.addEventListener("DOMContentLoaded", function () {
    const cartBadgeElements = document.querySelectorAll(".nav-action-list .nav-action-badge");
    function updateCartBadge(newTotalQuantity) {
        for (const cartBadgeElement of cartBadgeElements) {
                    cartBadgeElement.textContent = newTotalQuantity;
        }
    }

    document.querySelectorAll(".span[data-productid]").forEach(addCartButtonElement => {
        addCartButtonElement.addEventListener("click", async () => {
            console.log("Button Clicked");

            const prodId = addCartButtonElement.dataset.productid;
            console.log("Product ID:", prodId);

            const url = `/cart/items/${prodId}`;

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
                    updateCartBadge(responseData.newTotalItems);
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
