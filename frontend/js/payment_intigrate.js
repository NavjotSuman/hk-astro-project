const userInfoModal = document.getElementById("userInfoModal");
const afterPaymentModal = document.getElementById("afterPaymentModal")


const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve(true); // Script already loaded
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Failed to load Script : ${src}`));
        document.body.appendChild(script);
    });
};

const RazorpayPaymentGateway = () => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
        .then(() => {
            console.log("Razorpay script loaded successfully.");
            // const price = parseFloat(
            //     element.previousElementSibling.innerText.replace("$", "")
            // );
            // const title =
            //     element.parentElement.parentElement.firstElementChild.innerText;
            // onPayment(price, title);
            // onPayment()
            // Initialize Razorpay or perform any required operations here
        })
        .catch((error) => {
            console.error("Razorpay script failed to load:", error);
        });
};
RazorpayPaymentGateway()

// const onPayment = async (price, ItemName) => {
// const onPayment = async () => {
//     try {
//         //create order
//         const options = {
//             courseId: 1,
//             amount: 500,
//         };

//         let result;
//         let res = await fetch("http://localhost:4002/api/createOrder", {
//             method: "POST",
//             body: JSON.stringify(options),
//             headers: { "Content-Type": "application/json" },
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 result = res;
//                 console.log(res);
//             });

//         const paymentObject = new window.Razorpay({
//             key: "rzp_test_d8uIrwdSpiebaO",
//             order_id: result.id,
//             ...result,
//             handler: async function (response) {
//                 console.log("response = ", response);

//                 const options2 = {
//                     order_id: result.razorpay_order_id,
//                     payment_id: result.razorpay_payment_id,
//                     signature_id: result.razorpay_signature_id,
//                 };
//                 await fetch("http://localhost:4002/api/verifyPayment", {
//                     method: "POST",
//                     body: JSON.stringify(options2),
//                     headers: { "Content-Type": "application/json" },
//                 })
//                     .then((res) => res.json())
//                     .then((result) => {
//                         if (result?.success === true) {
//                             localStorage.removeItem('storeCartItems');
//                             console.log("result : ",result);
//                             alert("payment success");
//                         } else {
//                             alert("payment failed");
//                         }
//                     });
//             },
//         });

//         paymentObject.open();
//     } catch (error) {
//         console.log("there is error at onPayment : ", error);
//     }
// };

const openUserInfoModal = () => {
    userInfoModal.style.display = "flex";
};

const userInfoModalClose = () => {
    userInfoModal.style.display = "none";
};

// fetching the userInfo Cookie
function getCookie(name) {
    const cookies = document.cookie.split("; "); // Split all cookies by "; "
    for (let cookie of cookies) {
        const [key, value] = cookie.split("="); // Split each cookie into name and value
        if (key === name) {
            return JSON.parse(decodeURIComponent(value)); // Parse JSON from the cookie value
        }
    }
    return null; // Return null if the cookie is not found
}

// Function to handle form submission and store data in cookies
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    const customerName = document.getElementById("customerName").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const customerAddress = document.getElementById("customerAddress").value;
    const customerPincode = document.getElementById("customerPincode").value;

    // Combine form data into a single object
    const userInfo = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        pincode: customerPincode,
    };

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiry time in milliseconds
        const expires = "expires=" + date.toUTCString();
        document.cookie =
            name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    // Store the userInfo object as a JSON string in a single cookie
    setCookie("userInfo", JSON.stringify(userInfo), 15);

    // Optional: Display a success message or reset the form
    alert("Customer details saved successfully in a single cookie for 15 days!");
    document.getElementById("userInfoModal").reset(); // Reset form fields
    userInfoModalClose();
    // RazorpayPaymentGateway()
    createNewOrderProcess()

}

// Add event listener to the form
const form = document.getElementById("userInfoModal");
form.addEventListener("submit", handleFormSubmit);

const pay_modal_items = document.getElementById("pay_modal_items")
const pay_modal_userInfo = document.getElementById("pay_modal_userInfo")
const pay_modal_orderInfo = document.getElementById("pay_modal_orderInfo")
// process from crete order
const createNewOrderProcess = async()=>{
    const userInfo = getCookie("userInfo");
    const itemInfo = localStorage.getItem("storeCartItems");

    console.log("userInfo : ",userInfo);
    if (userInfo) {
        // Access each property
        // console.log("Customer Name:", userInfo.name);
        // console.log("Customer Email:", userInfo.email);
        // console.log("Customer Phone:", userInfo.phone);
        // console.log("Customer Address:", userInfo.address);
        // console.log("Customer Pincode:", userInfo.pincode);
        let res = await fetch("http://localhost:4002/api/order/createNewOrder",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userInfo,itemInfo})
        })
        res = await res.json()
        console.log("res : ",res);
        if (!res || !res.success) {
            console.log("order is not created...");
            return 
        }

        const paymentObject = new (window).Razorpay({
            key:"rzp_test_d8uIrwdSpiebaO",
            order_id: res.order.id,
            ...res.order,
            handler:async function (response) {
                console.log("response = ",response);

                const options = {
                    order_id:response.razorpay_order_id,
                    payment_id:response.razorpay_payment_id,
                    signature:response.razorpay_signature
                }
                await fetch("http://localhost:4002/api/order/verifyPayment", {
                    method: "POST",
                    body: JSON.stringify(options),
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => res.json())
                .then((result) => {
                    if (result?.success === true) {
                        console.log("payment success");
                        console.log("order : ",result);
                        localStorage.removeItem('storeCartItems');
                        // inserting the items
                        result.orderInfo.itemInfo.forEach(row => {
                            const tableRowHTML = `
                                <tr>
                                <td class="pay_modal_classname_border_b pay_modal_classname_border_gray_300 pay_modal_classname_p_2">${row.itemName}</td>
                                <td class="pay_modal_classname_border_b pay_modal_classname_border_gray_300 pay_modal_classname_p_2">${row.itemQuantity}</td>
                                <td class="pay_modal_classname_border_b pay_modal_classname_border_gray_300 pay_modal_classname_p_2">${row.itemPrice}</td>
                                <td class="pay_modal_classname_border_b pay_modal_classname_border_gray_300 pay_modal_classname_p_2">${row.itemTotalPrice}</td>
                                </tr>
                            `;
                            // Append the row to the table
                            pay_modal_items.innerHTML += tableRowHTML
                        })

                        const pay_modal_userInfo_HTML = `
                                <p><span class="pay_modal_classname_font_semibold">Name:</span> ${result.orderInfo.userInfo.customerName}</p>
                                <p><span class="pay_modal_classname_font_semibold">Email:</span> ${result.orderInfo.userInfo.customerEmail}</p>
                                <p><span class="pay_modal_classname_font_semibold">Phone Number:</span> ${result.orderInfo.userInfo.customerPhoneNumber}</p>
                                <p><span class="pay_modal_classname_font_semibold">Address:</span> ${result.orderInfo.userInfo.customerAddress}</p>
                                <p><span class="pay_modal_classname_font_semibold">Pincode:</span> ${result.orderInfo.userInfo.customerPincode}</p>
                            `;
                        // Append the row to the table
                        pay_modal_userInfo.innerHTML += pay_modal_userInfo_HTML

                        const pay_modal_orderInfo_HTML = `
                            <p><span class="pay_modal_classname_font_semibold">Order ID:</span> ${result.orderInfo.orderId}</p>
			                <p><span class="pay_modal_classname_font_semibold">Total Price:</span> ₹${result.orderInfo.totalPrice}</p>
                        `;
                        // Append the row to the table
                        pay_modal_orderInfo.innerHTML += pay_modal_orderInfo_HTML



                        // alert('payment success')



                        afterPaymentModal.style.display = "flex"
                    }else{
                        console.log("payment failed");
                        alert('payment failed')
                    }
                });
            }
        })

        paymentObject.open()

    } else {
        console.log("userInfo data not found.");
    }
}
// createNewOrderProcess()
function hidePayModal(){
    afterPaymentModal.style.display = "none"
}