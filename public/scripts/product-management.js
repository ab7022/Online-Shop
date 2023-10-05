
// const deleteProductButtonElements = document.querySelectorAll(".product-item button");

// async function deleteProduct(event) {
//     const buttonElement = event.target;
//     const productId = buttonElement.dataset.productId;

 
//         const response = await fetch(`/admin/products/${productId}`, {
//             method: "DELETE",
//         });

//         if (!response.ok) {
//             // Handle successful deletion, e.g., remove the product element from the UI
//             buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
//             console.log("Product deleted successfully");
       
//         }
    
// }

// for (const deleteProductButtonElement of deleteProductButtonElements) {
//     deleteProductButtonElement.addEventListener("click", deleteProduct);
// }
// Get all elements with the class "delete-product"
const deleteProductButtons = document.querySelectorAll(".product-item-actions button");


// Attach a click event listener to each button
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
                // Handle successful deletion
                console.log("Product deleted successfully");
                // Remove the product element from the UI
                buttonElement.closest(".product-item").remove();
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error("Error deleting product:", errorData.message);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Something went wrong");
        }
    });
});
