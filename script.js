


document.addEventListener("DOMContentLoaded", function () {
    function OTPInput() {
        const inputs = document.querySelectorAll("#otp > *[id]");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("keydown", function (event) {
                if (event.key === "Backspace") {
                    inputs[i].value = "";
                    if (i !== 0) inputs[i - 1].focus();
                } else {
                    if (i === inputs.length - 1 && inputs[i].value !== "") {
                        return true;
                    } else if (event.keyCode > 47 && event.keyCode < 58) {
                        inputs[i].value = event.key;
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    } else if (event.keyCode > 64 && event.keyCode < 91) {
                        inputs[i].value = String.fromCharCode(event.keyCode);
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    }
                }
            });
        }
    }
    OTPInput();

    function formChange() {
        const forLogin = document.querySelector(".LoginBox");
        const toOtp = forLogin.querySelector("#send-otp-btn");
        const forOtp = document.querySelector(".OtpBox");
        const closeOtp = forOtp.querySelector(".fa-xmark");

        // Initial state: hide OTP form
        forOtp.style.display = "none";

        // Event listener for showing OTP form
        toOtp.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
            if (validateLoginForm()) { // Validate form before showing OTP
                forOtp.style.display = "block";
                forLogin.style.display = "none";
            }
        });

        // Event listener for showing Login form
        closeOtp.addEventListener("click", function () {
            forLogin.style.display = "block";
            forOtp.style.display = "none";
        });

        // Click inside UserLogin to hide OTPBox (if clicked outside OTPBox)
        document.querySelector(".UserLogin").addEventListener("click", function (event) {
            if (forOtp.style.display === "block") {
                if (!forOtp.contains(event.target) && !forLogin.contains(event.target)) {
                    forLogin.style.display = "block";
                    forOtp.style.display = "none";
                }
            }
        });
    }
    formChange();

    function validateLoginForm() {
        const form = document.getElementById('loginForm');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const emailAddressInput = document.getElementById('emailAddress');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');

        // Regular expression for phone number (adjust based on your requirements)
        const phonePattern = /^[0-9]{10}$/; // 10-digit phone number

        let valid = true;
        // Clear previous errors
        phoneError.textContent = '';
        emailError.textContent = '';

        // Get input values
        const phoneNumber = phoneNumberInput.value.trim();
        const emailAddress = emailAddressInput.value.trim();

        // Validate phone number
        if (phoneNumber && !phonePattern.test(phoneNumber)) {
            phoneError.textContent = 'Phone number must be 10 digits long.';
            valid = false;
        }

        // Validate email address
        if (emailAddress && !validateEmail(emailAddress)) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        }

        // If neither field is filled correctly, prevent form submission
        if (!phoneNumber && !emailAddress) {
            phoneError.textContent = 'Please enter either a phone number or an email address.';
            emailError.textContent = 'Please enter either a phone number or an email address.';
            valid = false;
        }

        return valid;
    }

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});





