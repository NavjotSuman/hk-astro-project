
var imgDivs = document.querySelectorAll(".content .img_container img");
// Loop through each image container
imgDivs.forEach(function (imgDiv) {
    // Add click event listener to each image
    imgDiv.addEventListener("click", function () {
        // Find the corresponding overlay for the clicked image
        var overlay = this.parentElement.querySelector(".imgOverlay");
        // Add the class to display the overlay
        overlay.classList.add("overlayDiv");
    });
});

var cross = document.querySelectorAll(".cross i");
cross.forEach(function (crosses) {
    crosses.addEventListener("click", function () {
        var overLay = this.closest(".imgOverlay");
        overLay.classList.add("fade_Out");
        setTimeout(() => {
            overLay.classList.remove("fade_Out");
            overLay.classList.remove("overlayDiv");
        }, 1000);
    })
})

document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
        var overlays = document.querySelectorAll(".overlayDiv");
        overlays.forEach(function (overLay) {
            overLay.classList.add("fade_Out");
            setTimeout(() => {
                overLay.classList.remove("fade_Out");
                overLay.classList.remove("overlayDiv");
            }, 1000);
        });
    }
});