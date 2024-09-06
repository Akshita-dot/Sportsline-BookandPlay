document.addEventListener("DOMContentLoaded", function () {


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
    

        const forLogin = document.querySelector(".LoginBox");
        const toOtp = document.querySelector("#send-otp-btn");
        const forOtp = document.querySelector(".OtpBox");
        const closeOtp = document.querySelector(".fa-xmark");

        // Initial state: hide OTP form
        if(forOtp)
        {
            forOtp.style.display = "none";
        }
       

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

        function validateLoginForm() {
            const form = document.getElementById('loginForm');
            const phoneNumberInput = document.getElementById('phoneNumber');
            const emailAddressInput = document.getElementById('emailAddress');
            const phoneError = document.getElementById('phoneError');
            const emailError = document.getElementById('emailError');
        
            // Regular expression for phone number
            const phonePattern = /^[0-9]{10}$/; // 10-digit phone number
        
            let valid = false; // Start with invalid form
        
            // Clear previous errors
            phoneError.textContent = '';
            emailError.textContent = '';
        
            // Get input values
            const phoneNumber = phoneNumberInput.value.trim();
            const emailAddress = emailAddressInput.value.trim();
        
            // Validate phone number if provided
            if (phoneNumber) {
                if (!phonePattern.test(phoneNumber)) {
                    phoneError.textContent = 'Phone number must be 10 digits long.';
                } else {
                    valid = true; // Phone number is valid
                }
            }
        
            // Validate email address if provided
            if (emailAddress) {
                if (!validateEmail(emailAddress)) {
                    emailError.textContent = 'Please enter a valid email address.';
                } else {
                    valid = true; // Email address is valid
                }
            }
        
            // If neither field is filled correctly, display an error message
            if (!phoneNumber && !emailAddress) {
                phoneError.textContent = 'Please enter either a phone number or an email address.';
                emailError.textContent = 'Please enter either a phone number or an email address.';
            }
        
            return valid; // Return true if at least one field is valid
        }
        
        // Email validation function
        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
    



        function updateFormLabels() {
            // Get references to the elements
            const phoneLabel = document.querySelector('label[for="phoneNumber"]');
            const phoneInput = document.querySelector('.form-group #phoneNumber');
            
            // Check the current window width
            const isDesktop = window.innerWidth >= 542;
            
            if (isDesktop) {
                // Update label and placeholder for desktop view
                phoneLabel.textContent = 'Phone Number';
                phoneInput.placeholder = 'Enter Phone Number';
            } else {
                // Update label and placeholder for mobile view
                phoneLabel.textContent = 'Mobile Number';
                phoneInput.placeholder = 'Enter Mobile No.';
            }
        }
        
        // Call the function on page load
        updateFormLabels();
        
        // Also update on window resize
        window.addEventListener('resize', updateFormLabels);

});


document.addEventListener("DOMContentLoaded", function (){

    function validateRegistrationForm() {
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const dateFieldInput = document.getElementById('dateField');
        const emailInput = document.getElementById('email');
        const mobileNumberInput = document.getElementById('mobileNumberRegister');
        const pinInput = document.getElementById('pin');
        const gridCheckInput = document.getElementById('gridCheck');

        // Error message elements
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('LastNameError');
        const dobError = document.getElementById('dobError');
        const emailAddError = document.getElementById('emailAddError');
        const mobError = document.getElementById('mobError');
        const pinError = document.getElementById('pinError');
        const formCheckError = document.getElementById('formCheckError');

        // Validation patterns
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[0-9]{10}$/;

        // Flag for form validity
        let valid = true;

        // Clear previous errors
        firstNameError.textContent = '';
        lastNameError.textContent = '';
        dobError.textContent = '';
        emailAddError.textContent = '';
        mobError.textContent = '';
        pinError.textContent = '';
        formCheckError.textContent = '';

        // Validate First Name
        const firstName = firstNameInput.value.trim();
        if (firstName === '') {
            firstNameError.textContent = 'First Name is required.';
            valid = false;
        } else {
            // Additional validation for first name can go here if needed
        }

        // Validate Last Name
        const lastName = lastNameInput.value.trim();
        if (lastName === '') {
            lastNameError.textContent = 'Last Name is required.';
            valid = false;
        } else {
            // Additional validation for last name can go here if needed
        }

        // Validate Date of Birth
        const dob = dateFieldInput.value.trim();
        if (dob === '') {
            dobError.textContent = 'Date of Birth is required.';
            valid = false;
        } else {
            // Additional validation for date of birth can go here if needed
        }

        // Validate Email Address
        const email = emailInput.value.trim();
        if (email === '') {
            emailAddError.textContent = 'Email Address is required.';
            valid = false;
        } else if (!emailPattern.test(email)) {
            emailAddError.textContent = 'Invalid email address.';
            valid = false;
        }

        // Validate Mobile Number
        const mobileNumber = mobileNumberInput.value.trim();
        if (mobileNumber === '') {
            mobError.textContent = 'Mobile Number is required.';
            valid = false;
        }else if (!mobilePattern.test(mobileNumber)) {
            mobError.textContent = 'Mobile Number must be 10 digits.';
            valid = false;
        }else if(mobilePattern.test(mobileNumber)){
            document.querySelector(".validCheck").style.display = "block";
        }

        // Validate PIN Code
        const pin = pinInput.value.trim();
        if (pin === '') {
            pinError.textContent = 'PIN Code is required.';
            valid = false;
        } else if (isNaN(pin) || pin.length !== 6) {
            pinError.textContent = 'PIN Code must be a 6-digit number.';
            valid = false;
        }

        // Validate Checkbox
        if (!gridCheckInput.checked) {
            formCheckError.textContent = 'You must agree to the Terms & Conditions and Privacy Policy.';
            valid = false;
        }

        setupInputListeners();

        return valid; // Return true if all validations pass
    }


    function setupInputListeners() {
        const inputs = [
            document.getElementById('firstName'),
            document.getElementById('lastName'),
            document.getElementById('dateField'),
            document.getElementById('email'),
            document.getElementById('mobileNumberRegister'),
            document.getElementById('pin'),
            document.getElementById('gridCheck')
        ];
    
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateRegistrationForm(); // Re-validate on input change
            });
        });
    }
    

    const buttonToRegister = document.querySelector("#registrationForm #register-btn");
   
    buttonToRegister.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form submission
        if (validateRegistrationForm()) { // Validate form before showing OTP
          alert("Clicked!");
        //   buttonToRegister.submit();
        }
    });

})












