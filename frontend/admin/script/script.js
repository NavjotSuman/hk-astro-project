// const dummyData = [
//     {"orderNumber": 1, "orderId": "ORD1001", "itemName": "Coffee Mug", "itemPrice": 12.45, "quantity": 2, "totalPrice": 24.9, "orderStatus": "Pending", "customerName": "John Doe", "customerEmail": "johndoe@example.com", "customerPhone": "123-456-7890", "customerAddress": "123 Main St, Anytown, CA 12345", "customerPincode": "12345"},
//     {"orderNumber": 2, "orderId": "ORD1002", "itemName": "T-Shirt", "itemPrice": 19.99, "quantity": 1, "totalPrice": 19.99, "orderStatus": "Completed", "customerName": "Jane Smith", "customerEmail": "janesmith@example.com", "customerPhone": "987-654-3210", "customerAddress": "456 Elm St, Anytown, CA 54321", "customerPincode": "54321"},
//     {"orderNumber": 3, "orderId": "ORD1003", "itemName": "Notebook", "itemPrice": 7.49, "quantity": 3, "totalPrice": 22.47, "orderStatus": "Pending", "customerName": "Michael Johnson", "customerEmail": "michaelj@example.com", "customerPhone": "555-555-5555", "customerAddress": "789 Oak St, Anytown, CA 67890", "customerPincode": "67890"},
//     {"orderNumber": 4, "orderId": "ORD1004", "itemName": "Pen", "itemPrice": 2.35, "quantity": 5, "totalPrice": 11.75, "orderStatus": "Cancelled", "customerName": "Emily Brown", "customerEmail": "emilyb@example.com", "customerPhone": "444-444-4444", "customerAddress": "101 Pine St, Anytown, CA 98765", "customerPincode": "98765"},
//     {"orderNumber": 5, "orderId": "ORD1005", "itemName": "Backpack", "itemPrice": 45.99, "quantity": 1, "totalPrice": 45.99, "orderStatus": "Delivered", "customerName": "David Lee", "customerEmail": "davidl@example.com", "customerPhone": "333-333-3333", "customerAddress": "222 Cedar St, Anytown, CA 76543", "customerPincode": "76543"},
//     {"orderNumber": 6, "orderId": "ORD1006", "itemName": "Water Bottle", "itemPrice": 15.00, "quantity": 2, "totalPrice": 30.00, "orderStatus": "Pending", "customerName": "Sarah Kim", "customerEmail": "sarahk@example.com", "customerPhone": "222-222-2222", "customerAddress": "333 Maple St, Anytown, CA 87654", "customerPincode": "87654"},
//     {"orderNumber": 7, "orderId": "ORD1007", "itemName": "Mouse Pad", "itemPrice": 9.99, "quantity": 1, "totalPrice": 9.99, "orderStatus": "Completed", "customerName": "Robert Chen", "customerEmail": "robertc@example.com", "customerPhone": "111-111-1111", "customerAddress": "444 Oak St, Anytown, CA 98765", "customerPincode": "98765"},
//     {"orderNumber": 8, "orderId": "ORD1008", "itemName": "Headphones", "itemPrice": 85.45, "quantity": 1, "totalPrice": 85.45, "orderStatus": "Cancelled", "customerName": "Olivia Nguyen", "customerEmail": "olivian@example.com", "customerPhone": "666-666-6666", "customerAddress": "555 Pine St, Anytown, CA 76543", "customerPincode": "76543"},
//     {"orderNumber": 9, "orderId": "ORD1009", "itemName": "Laptop Stand", "itemPrice": 49.99, "quantity": 1, "totalPrice": 49.99, "orderStatus": "Cancelled", "customerName": "Ethan Lee", "customerEmail": "ethanl@example.com", "customerPhone": "777-777-7777", "customerAddress": "666 Cedar St, Anytown, CA 87654", "customerPincode": "87654"},
//     {"orderNumber": 10, "orderId": "ORD1010", "itemName": "USB Cable", "itemPrice": 6.50, "quantity": 2, "totalPrice": 13.00, "orderStatus": "Delivered", "customerName": "Ava Miller", "customerEmail": "avamiller@example.com", "customerPhone": "888-888-8888", "customerAddress": "777 Maple St, Anytown, CA 98765", "customerPincode": "98765"},
//     {"orderNumber": 11, "orderId": "ORD1011", "itemName": "Coffee Mug", "itemPrice": 14.99, "quantity": 1, "totalPrice": 14.99, "orderStatus": "Pending", "customerName": "Benjamin Davis", "customerEmail": "bendavis@example.com", "customerPhone": "999-999-9999", "customerAddress": "888 Oak St, Anytown, CA 76543", "customerPincode": "76543"},
//     {"orderNumber": 12, "orderId": "ORD1012", "itemName": "T-Shirt", "itemPrice": 21.99, "quantity": 2, "totalPrice": 43.98, "orderStatus": "Completed", "customerName": "Sophia Martinez", "customerEmail": "sophia@example.com", "customerPhone": "111-222-3333", "customerAddress": "999 Pine St, Anytown, CA 98765", "customerPincode": "98765"}
// ]
async function fetchData() {
    let res = await fetch("http://localhost:4002/api/order/getAllOrder", {
        credentials: "include",
    })
    if (!res.ok || !(res.status === 200)) {
        return console.log("somthing went wrong");
    }
    res = await res.json()
    const allOrders = res.orders

    const orderTable = document.getElementById('order-table')
    // console.log(orderTable);

    console.log(allOrders);

    allOrders && allOrders.length > 0 ? allOrders.forEach((order, index) => {
        console.log("hello Navjot");
        orderTable.insertAdjacentHTML(
            'beforeend', `
        <tr class="hover:bg-gray-100" data-oid="${order._id}">
                        <td class="px-4 py-2 border border-gray-300">${index + 1}</td>
                        <td class="px-4 py-2 border border-gray-300">${order.orderId}</td>
                        <td class="px-4 py-2 border border-gray-300">${order.customerInfo.customerName}</td>
                        <td class="px-4 py-2 border border-gray-300">${order.customerInfo.customerEmail || "-"}</td>
                        <td class="px-4 py-2 border border-gray-300">${order.customerInfo.customerPhoneNumber}</td>
                        <td class="px-4 py-2 border border-gray-300 min-w-[300px]">${order.customerInfo.customerAddress}</td>
                        <td class="px-4 py-2 border border-gray-300">${order.customerInfo.customerPincode}</td>
                        <td class="px-4 py-2 border border-gray-300 whitespace-nowrap w-auto">
                            <ul class="list-disc pl-4">
                                ${order.items.map(item=>{
                                    return `<li>${item.itemName}</li>`
                                }).join('')}
                            </ul>
                        </td>
                        <td class="px-4 py-2 border border-gray-300 whitespace-nowrap w-auto">
                            <ul class="list-disc pl-4">
                                ${order.items.map(item=>{
                                    return `<li>${item.itemPrice}</li>`
                                }).join('')}
                            </ul>
                        </td>
                        <td class="px-4 py-2 border border-gray-300 whitespace-nowrap w-auto">
                            <ul class="list-disc pl-4">
                                ${order.items.map(item=>{
                                    return `<li>${item.itemQuantity}</li>`
                                }).join('')}
                            </ul>
                        </td>
                        <td class="px-4 py-2 border border-gray-300">${order.totalPrice}</td>
                        <td class="px-4 py-2 border border-gray-300">
                        <select
                            id="status-${order._id}"
                            class="border border-gray-300 rounded p-1 selectOrderState"
                            onchange="updateOrderStatus('${order._id}')"
                            select="${order.orderStatus}"
                            onFocus="storePreviousValue(this)"
                        >
                            <option value="Pending" ${order.orderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Completed" ${order.orderStatus === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Cancelled" ${order.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                        </td>
                        <td class="px-4 py-2 border border-gray-300 text-center">
                            <button class="text-red-500 hover:text-red-700 ml-2" onclick="deleteOrder('${order._id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
        `)
    }) : orderTable.insertAdjacentHTML(
        'beforeend',
        `
        <tr class="hover:bg-gray-100">
            <td class="px-4 py-2 border border-gray-300 text-center" colspan="13">No Record Found</td>
        </tr>
        `
    );

}
fetchData();





// Variables to store orderId and newStatus dynamically
let currentOrderId = null;
let currentNewStatus = null;
let currentOldStatus = null
let selectedOrder = null

// store the previous stateof element
const storePreviousValue = (e)=>{
    console.log("e.value : ",e.value);
    currentOldStatus = e.value
}

// Open the modal
function openModal() {
    document.getElementById('statusModal').classList.remove('hidden');
}

// Close the modal
function closeModal(isUpdated = false) {
    document.getElementById('statusModal').classList.add('hidden');
    if (!isUpdated) {
        selectedOrder.value = currentOldStatus
    }
    currentOrderId = null;
    currentNewStatus = null;
    currentOldStatus = null
    selectedOrder = null;
}

// Confirm status update
async function confirmUpdate() {
    if (currentOrderId && currentNewStatus) {
        // console.log(`from confirm : ${currentOrderId} ${currentNewStatus}`);
        console.log("confirm modal");

        // Perform the API call to update the order status
        await fetch(`http://localhost:4002/api/order/updateOrderStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId: currentOrderId, orderStatus: currentNewStatus }),
            credentials: "include",
        })
        .then((res)=>res.json())
        .then((result)=>console.log("result : ",result.message))
        .catch((err)=>{console.log("somthing went wrong : ",err.message);})
    }

    closeModal(true); // Close the modal after confirmation
}

// Update order status function
function updateOrderStatus(orderId) {
    selectedOrder = document.getElementById(`status-${orderId}`)
    currentOrderId = orderId
    currentNewStatus = selectedOrder.value
    if (currentNewStatus === "Pending" || currentNewStatus === "Completed" || currentNewStatus === "Cancelled") {
        openModal();
    }
}



//delete order
async function deleteOrder(orderId){
    try {
        console.log(orderId);
        let res = await fetch(`http://localhost:4002/api/order/deleteOrder/${orderId}`,{
            method:"POST",
            credentials: "include"
        })
        console.log("res : ",res);
        res = await res.json()
        console.log("res : ",res);
        
    } catch (error) {
        console.log(`somthing went wrong : `,error.message);
    }
}