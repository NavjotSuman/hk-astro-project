
document.addEventListener("DOMContentLoaded", () => {
    // Load cart items from localStorage
    let storeCartItems = JSON.parse(localStorage.getItem("storeCartItems")) || [];
    const itemDiv = document.getElementById("itemsCart");
    const paybtnDiv = document.getElementById("payBtn");
    const paybtn = paybtnDiv && paybtnDiv.querySelector("button");

    // Function to render cart items
    const renderCartItems = () => {
        itemDiv.innerHTML = ""; // Clear existing items
        const windowWidth = window.innerWidth <= 500;

        
        if (paybtn) {
            paybtn.classList.add("d-block");
        };
        if (storeCartItems.length === 0) {
            const errorMessage = document.createElement("h3");
            errorMessage.classList.add("mb-5");
            errorMessage.textContent = "Cart Empty";
            itemDiv.appendChild(errorMessage);
            
            if (paybtn) {
                paybtn.setAttribute("disabled", "true")
            };
            return;
        }

        if( windowWidth ) {
            storeCartItems.forEach(item => {
                const totalPrice = item.price * item.quantity;
                const itemInCart = document.createElement("div");
                itemInCart.className = "container mt-2 mb-2";
                itemInCart.innerHTML = `
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8">
                        <div class="p-2 bg-white mt-4 px-3 rounded">
                            <div class="mr-1 text-center">
                                <img class="rounded" src="images/${item.image}" width="60%">
                            </div>
                            <div class="d-flex flex-column align-items-center product-details my-2 mb-3">
                                <span class="font-weight-bold fs-1 text-center">${item.name}</span>
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-between">
                                <div class="d-flex flex-row align-items-center qty">
                                    <i class="fa fa-minus text-danger mr-2 minusQuantity" data-id="${item._id}" data-quantity="${item.quantity}"></i>
                                    <h5 class="text-grey mr-1 ml-1 quantityValue" data-id="${item._id}">${item.quantity}</h5>
                                    <i class="fa fa-plus text-success ml-2 addQuantity" data-id="${item._id}" data-quantity="${item.quantity}"></i>
                                </div>
                                <div>
                                    <h5 class="text-grey price"> &#8377; ${totalPrice} /-</h5>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="fa fa-trash mb-1 text-danger delete-btn" data-id="${item._id}"></i>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>`;
                itemDiv.appendChild(itemInCart);
            });
        } 
        else {
            storeCartItems.forEach(item => {
                const totalPrice = item.price * item.quantity;
                const itemInCart = document.createElement("div");
                itemInCart.className = "container mt-2 mb-2";
                itemInCart.innerHTML = `
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8">
                        <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div class="mr-1">
                                <img class="rounded" src="images/${item.image}" width="70">
                            </div>
                            <div class="d-flex flex-column align-items-center product-details w-40">
                                <span class="font-weight-bold text-center">${item.name}</span>
                            </div>
                            <div class="d-flex flex-row align-items-center qty">
                                <i class="fa fa-minus text-danger mr-2 minusQuantity" data-id="${item._id}" data-quantity="${item.quantity}"></i>
                                <h5 class="text-grey mr-1 ml-1 quantityValue" data-id="${item._id}">${item.quantity}</h5>
                                <i class="fa fa-plus text-success ml-2 addQuantity" data-id="${item._id}" data-quantity="${item.quantity}"></i>
                            </div>
                            <div>
                                <h5 class="text-grey price"> &#8377; ${totalPrice} /-</h5>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa fa-trash mb-1 text-danger delete-btn" data-id="${item._id}"></i>
                            </div>
                        </div>                    
                    </div>
                </div>`;
                itemDiv.appendChild(itemInCart);
            });
        }
    };

    // Function to update localStorage
    const updateLocalStorage = () => {
        localStorage.setItem("storeCartItems", JSON.stringify(storeCartItems));
    };

    // Function to handle quantity changes
    const handleQuantityChange = (itemId, change) => {
        const item = storeCartItems.find(item => item._id === itemId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            storeCartItems = storeCartItems.filter(item => item._id !== itemId);
        }

        updateLocalStorage();
        renderCartItems();
    };

    // Event listeners for quantity buttons and delete buttons
    itemDiv.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("addQuantity")) {
            handleQuantityChange(target.getAttribute("data-id"), 1);
        }
        else if (target.classList.contains("minusQuantity")) {
            handleQuantityChange(target.getAttribute("data-id"), -1);
        }
        else if (target.classList.contains("delete-btn")) {
            storeCartItems = storeCartItems.filter(item => item._id !== target.getAttribute("data-id"));
            updateLocalStorage();
            renderCartItems();
        }
    });

    // Add pointer class on hover
    itemDiv.addEventListener("mouseover", (e) => {
        const target = e.target;
        if (target.classList.contains("addQuantity") ||
            target.classList.contains("minusQuantity") ||
            target.classList.contains("delete-btn")) {
            target.classList.add("pointer");
        }
    });

    // Initial render of cart items
    renderCartItems();
});