`use strict`

const slider = document.getElementById("length-slider");
const length_number = document.getElementById("length-num");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const password_text = document.getElementById("password-txt");
const copy = document.getElementById("copy");
const copied = document.getElementById("copied");
const strength_bars = document.getElementById("strength-bars");
const strength_type = document.getElementById("strength-type");
const error = document.getElementById("error");

// slider functionality
slider.addEventListener("input", (event) => {
    let thumbPosition = (event.target.value - event.target.min) / (event.target.max - event.target.min);
    thumbPosition = thumbPosition * 100 + '%';
    document.documentElement.style.setProperty('--thumb-position', thumbPosition);
    length_number.textContent = slider.value;
})

function generatePassword(event) {
    event.preventDefault();

    let passwordCharacters;
    let length = slider.value;
    let generatedPassword = "";
    let passwordStrength = 0;

    // adding characters to password character that is string(char array)
    if (uppercase.checked) {
        passwordCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        passwordStrength += 4;
    }
    if (lowercase.checked) {
        passwordCharacters += "abcdefghijklmnopqrstuvwxyz";
        passwordStrength += 2;
    }
    if (number.checked) {
        passwordCharacters += "0123456789";
        passwordStrength += 6;
    }
    if (symbol.checked) {
        passwordCharacters += `~!@#$%^&*()_-+={[}]|\:;"'<,>.?/`;
        passwordStrength += 8;
    }
    if (!uppercase.checked && !lowercase.checked && !number.checked && !symbol.checked) {
        error.classList.add("error-active");
        return;
    }
    passwordStrength = Math.ceil(passwordStrength / 5);
    let strengthClass = ""

    // removing all classes from bars for making that approprite to the password strength later
    for (let j = 0; j < 4; j++) {
        strength_bars.children[j].classList.remove("too-weak");
        strength_bars.children[j].classList.remove("weak");
        strength_bars.children[j].classList.remove("medium");
        strength_bars.children[j].classList.remove("strong");
    }

    // giving bars classes according to what is password strength
    for (let i = 0; i < passwordStrength; i++) {
        if (passwordStrength === 1) {
            strengthClass = "too-weak";
            strength_type.textContent = "TOO-WEAK";
            error.classList.remove("error-active");
        } else if (passwordStrength === 2) {
            strengthClass = "weak";
            strength_type.textContent = "WEAK";
            error.classList.remove("error-active");
        }else if (passwordStrength === 3) {
            strengthClass = "medium";
            strength_type.textContent = "MEDIUM";
            error.classList.remove("error-active");
        }else {
            strengthClass = "strong";
            strength_type.textContent = "STRONG";
            error.classList.remove("error-active");
        }
        strength_bars.children[i].classList.add(strengthClass);
    }
    
    // getting characters randomly from passwordCharacters string
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * passwordCharacters.length);
        let randomCharacter = passwordCharacters[randomIndex];
        generatedPassword += randomCharacter;
    }

    // displaying password and changing its color
    password_text.textContent = generatedPassword;
    password_text.classList.add("password-txt-active");
}

// copyting a password to computer's clipboard
copy.addEventListener("click", function() {
    navigator.clipboard.writeText(password_text.textContent)
        .then(() => {
            copied.classList.add("copied-active");
            setTimeout(() => {
                copied.classList.remove("copied-active");
            }, 2000);
        })
        .catch((error) => {
            console.log("Error copying text to clipboard", error)
        })
})

