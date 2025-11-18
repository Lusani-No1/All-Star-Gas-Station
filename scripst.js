document.addEventListener("DOMContentLoaded", () => {
    console.log("Form validation script loaded");

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            let valid = true;

            const name = form.querySelector('input[name="name"]');
            const surname = form.querySelector('input[name="surname"]');
            const email = form.querySelector('input[name="email"]');
            const comments = form.querySelector('textarea[name="comments"]');

            console.log("Form submission attempted");

            // Helper functions
            function showError(field, message) {
                field.style.borderColor = "red";
                let error = field.nextElementSibling;
                if (!error || !error.classList.contains("error-message")) {
                    error = document.createElement("span");
                    error.className = "error-message";
                    error.style.cssText = "color: red; font-size: 12px; display: block; margin-top: 5px;";
                    error.innerText = message;
                    field.parentNode.insertBefore(error, field.nextSibling);
                } else {
                    error.innerText = message;
                }
            }

            function clearError(field) {
                field.style.borderColor = "";
                let error = field.nextElementSibling;
                if (error && error.classList.contains("error-message")) {
                    error.remove();
                }
            }

            // Clear previous errors
            [name, surname, email, comments].forEach(field => {
                if (field) clearError(field);
            });

            // Validate Name (min 4 letters, only letters)
            if (name && (!name.value.trim().match(/^[A-Za-z]{4,}$/) || name.value.trim() === "")) {
                valid = false;
                showError(name, "Please enter at least 4 letters (letters only).");
            }

            // Validate Surname (min 4 letters, only letters)
            if (surname && (!surname.value.trim().match(/^[A-Za-z]{4,}$/) || surname.value.trim() === "")) {
                valid = false;
                showError(surname, "Please enter at least 4 letters (letters only).");
            }

            // Validate Email (must contain @gmail or @email)
            if (email && email.value.trim() !== "" && 
                !email.value.includes("@gmail") && !email.value.includes("@email")) {
                valid = false;
                showError(email, "Email must contain @gmail or @email.");
            }

            // Validate Comments (min 10 characters)
            if (comments && comments.value.trim().length < 10 && comments.value.trim() !== "") {
                valid = false;
                showError(comments, "Comment must be at least 10 characters.");
            }

            if (!valid) {
                e.preventDefault();
                console.log("Form validation failed");
                // Remove the alert if you want cleaner UX
                // alert("Please correct the highlighted fields.");
            } else {
                console.log("Form validation passed");
                alert("Thank you! Your form has been submitted.");
                // In a real application, you would submit the form to a server here
            }
        });
    });

    // Scroll-to-top button
    const scrollBtn = document.createElement("button");
    scrollBtn.textContent = "↑";
    scrollBtn.id = "scrollTopBtn";
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
});