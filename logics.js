// Learn More button
const learnMoreButton = document.querySelector(".hero button");

learnMoreButton.addEventListener("click", function () {
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth"
    });
});


// Contact form
const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Thank you, " + name + "! Your message has been received.");

    contactForm.reset();
});