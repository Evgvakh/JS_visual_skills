function slidesPlugin(activeSlide = 3) {
    const slides = document.querySelectorAll(".slide");
    const body = document.querySelector("body");

    slides[activeSlide].classList.add("active");

    const colorsArray = [
        "rgb(59, 39, 39)",
        "rgb(34, 11, 11)",
        "rgb(30, 24, 32)",
        "rgb(17, 17, 17)",
    ];

    for (let slide of slides) {
        slide.addEventListener("click", () => {
            clearActiveClasses();
            slide.classList.add("active");
            body.style.backgroundColor =
                colorsArray[Math.floor(Math.random() * colorsArray.length)];
        });
    }

    function clearActiveClasses() {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
    }
}

slidesPlugin();
