(async function() {
    let res = await fetch('http://localhost:4002/api/auth/isLoggedIn',{
        method:"GET",
        credentials: "include",
    })
    res = await res.json()
    if (res.success === true) {
        window.location.href = '/all-orders'; 
    }
})()


submitButton.addEventListener("click", async (event) => {
    // Prevent default form submission
    event.preventDefault();
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    if (email && password) {
        const loginData = {
            "email": email.value,
            "password": password.value
        };
        await fetch("http://localhost:4002/api/auth/login", {
            method: "POST", // HTTP method
            headers: {
                "Content-Type": "application/json", // Indicates JSON data in request
            },
            body: JSON.stringify(loginData), // Convert JavaScript object to JSON string
            credentials: "include",
        }).then((response) => {
            return response.json(); // Parse JSON response
        })
        .then((data) => {
            const elem = document.getElementById("warning-tag")
            if (data && data.success) {
                localStorage.setItem("adminName", data.user.adminName);
                localStorage.setItem("adminEmail", data.user.email);
                elem.style.display = "none"
            }else{
                elem.style.display = "block"
                elem.innerText = data.message
            }
        })
        .catch((error) => {
            console.log("Error during login:", error);
        });
    }
});


