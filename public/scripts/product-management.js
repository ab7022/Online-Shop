const deleteProductButtons = document.querySelectorAll(".product-item-actions button");


deleteProductButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
        const buttonElement = event.target;
        const productId = buttonElement.getAttribute("data-productid");

        console.log("Clicked Delete Button. Product ID:", productId);

        try {
            const response = await fetch(`/admin/products/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Product deleted successfully");
                buttonElement.closest(".product-item").remove();
            } else {
                const errorData = await response.json();
                console.error("Error deleting product:", errorData.message);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Something went wrong");
        }
    });
});
