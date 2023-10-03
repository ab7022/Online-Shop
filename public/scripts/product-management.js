import { deleteProduct as deleteProductFromController } from "../../controllers/admin.controller";
import { csrfToken as _csrfToken } from "../../middlewares/csrf-token";

const deleteProductButtonElements = document.querySelectorAll(".product-item button");

async function deleteProduct(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productId;
    const csrfToken = buttonElement.dataset.csrf;
    const submittedToken = req.body._csrf;
    console.log("submittedToken:", submittedToken);

    console.log("productId:", productId);
    console.log("csrfToken:", _csrfToken());

    try {
        // const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
        //     method: "DELETE"
        // });
        const response = await fetch(`/admin/products/${productId}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrfToken, // Include the CSRF token in headers
            },
        });
        if (response.ok) {
            // Handle successful deletion, e.g., remove the product element from the UI
            buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
            console.log("Product deleted successfully");
        } else {
            // Handle error response
            const errorData = await response.json();
            console.error("Error response:", errorData);
            alert(errorData.message);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Something went wrong");
    }
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener("click", deleteProduct);
}
