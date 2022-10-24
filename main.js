'use strict';

const lengthSlider = document.querySelector(".pass-length input");
const lengthLabel = document.querySelector(".pass-length span");

const generateBtn = document.querySelector(".generate-btn");
const options = document.querySelectorAll(".option input");
const password = document.querySelector(".input-box input");

const warning = document.querySelector(".warning");

const passwordIndicator = document.querySelector(".pass-indicator");

const copy = document.querySelector(".copy-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "~!@#$%^&*()_-+=<>.,?[]:;",
};

let randomPassword = "";

lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
copy.addEventListener('click', function() {
  navigator.clipboard.writeText(randomPassword);
  copy.innerHTML = 'done';
});

function updateSlider() {
  lengthLabel.innerHTML = lengthSlider.value;
  generatePassword();
}

function updatePasswordIndicator() {
  passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 17 ? "medium" : "strong";
  console.log(passwordIndicator.id);
}

function generatePassword() {
  copy.innerHTML = 'content_copy';

  let staticPassword = "";
  let passwordLength = lengthSlider.value;

  options.forEach(option => {
    if (option.checked) {
      staticPassword += characters[option.id];
    }
  });

  if (staticPassword) {
    for (let i = 0; i < passwordLength; i++) {
      randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
    }

    updatePasswordIndicator();
    password.value = randomPassword;
    warning.style.opacity = "0";
  } else {
    warning.style.opacity = "100%";
  }
}
