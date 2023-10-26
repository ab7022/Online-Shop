const updateOrderFormElements = document.querySelectorAll(".order-actions form")

async function updateOrder(event) {
    event.preventDefault()
    const form = event.target
    const formData = new formData(form)
    const newStatus = "cencelled"
    const orderId = formData.get("orderid")

    let response
    try {
        response = await fetch(`/admin/orders/${orderId}`,{
            method:"POST",
            body:JSON.stringify({
                newStatus:newStatus
            }),
            headers:{
                "Content-Type":"application/json",
            },
        })
    } catch (error) {
        alert("Something went wrong - could not update order status")
        return
    }
    if(!response.ok){
        alert("Something went wrong - could not update order status")
        return
    }
    const responseData = await response.json()
    console.log("status updated succesfully")
    form.parentElement.parentElement.querySelector(".badge").textContent = responseData.newStatus.toUpperCase()

    for(const updateOrderFormElement of updateOrderFormElements){
        updateOrderFormElement.addEventListener("submit",updateOrder)
    }
}