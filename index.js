const loc = document.getElementById("location");

const loginUser = document.querySelector(".login");

const closeModal = document.querySelector(".close-modal");
const signUpUser = document.querySelector(".signup");
const closeSignup = document.querySelector(".close-signup");
const closeOtp = document.querySelector(".close-otp");

const loginLink = document.querySelector(".login-link");
const signupLink = document.querySelector(".signup-link");

const createAccnt = document.querySelector(".btn-create-accnt");
const sendPswrd = document.querySelector(".send-password");
const continueEmail = document.querySelector(".continue-email");

const loginAlert = document.querySelector(".login-alert");
const signupAlert = document.querySelector(".signup-alert");
const emailAlert = document.querySelector(".email-alert");

const locDropDown = document.querySelector(".dropdown-icon");

const dropDownDiv = document.querySelector(".dropdown-div");

document.getElementById("selected-location").innerText = loc.value;

const backToLogin = document.querySelector(".back-to-login");
const closeEmailModal = document.querySelector(".close-email-modal");
const sendPasswordEmail = document.querySelector(".send-password-to-email");

const resendOtp = document.querySelector(".send-otp");
let count = 30;

function locationsDisplay() {
  event.preventDefault();
  event.stopPropagation();
  dropDownDiv.innerHTML = "";
  dropDownDiv.style.display = "block";
  let info = "";
  for (let i = 0; i < loc.length; i++) {
    let city = loc[i].innerText;
    info = `<p class='drop-down-location'><a>${city}</a></p>`;
    dropDownDiv.innerHTML += info;
  }
  const dropDownDivLocation = document.querySelectorAll(".drop-down-location");
  dropDownDivLocation.forEach((location) => {
    location.addEventListener("click", () => {
      document.getElementById("selected-location").innerText =
        location.innerText;
      loc.value = location.innerText;
      dropDownDiv.style.display = "none";
    });
  });
}

loc.addEventListener("mousedown", locationsDisplay);
loc.addEventListener("click", locationsDisplay);

locDropDown.addEventListener("click", locationsDisplay);

function openLogin() {
  event.stopPropagation();
  document.querySelector(".login-modal-class").style.display = "block";
  document.querySelector(".signup-modal-class").style.display = "none";
  document.querySelector(".send-pswrd-to-email").style.display = "none";
}

loginUser.addEventListener("click", openLogin);
loginLink.addEventListener("click", openLogin);
backToLogin.addEventListener("click", openLogin);

function openSignUp() {
  event.stopPropagation();
  document.querySelector(".signup-modal-class").style.display = "block";
  document.querySelector(".login-modal-class").style.display = "none";
}

signUpUser.addEventListener("click", openSignUp);
signupLink.addEventListener("click", openSignUp);

function closeModalGroup() {
  document.querySelector(".signup-modal-class").style.display = "none";
  document.querySelector(".login-modal-class").style.display = "none";
  document.querySelector(".send-pswrd-to-email").style.display = "none";
  document.querySelector(".otpverification").style.display = "none";
}

closeModal.addEventListener("click", closeModalGroup);
closeSignup.addEventListener("click", closeModalGroup);
closeEmailModal.addEventListener("click", closeModalGroup);
closeOtp.addEventListener("click", closeModalGroup);
document.querySelector(".logout").addEventListener("click", () => {
  console.log("reload reqnf");
  location.reload();
});

createAccnt.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const name = document.querySelector("#fullname").value;
  const email = document.querySelector("#email").value;
  const termsChecked = document.querySelector("#terms").checked;
  signupAlert.style.display = "block";

  if (name && email && termsChecked) {
    let registeredUser = users.filter(
      (data) => data.name === name && data.email === email
    );
    console.log(registeredUser);
    if (registeredUser.length > 0) {
      signupAlert.innerHTML = `${name} is already registerd with us,Kindly proceed to Login`;
    } else {
      users.push({ name, email });
      console.log(users);
      signupAlert.innerHTML = `User details Created for ${name}`;
    }
  } else {
    signupAlert.innerHTML = "kindly enter all the related details";
  }
  document.querySelector("#fullname").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#terms").checked = "";
});

sendPswrd.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const mobile = document.querySelector("#mobile").value;
  loginAlert.style.display = "block";
  if (mobile) {
    let registeredUser = users.filter((data) => data.mobile === mobile);
    if (registeredUser.length > 0) {
      document.querySelector("#username").innerText = registeredUser[0].name;
      document.querySelector(".login-modal-class").style.display = "none";
      document.querySelector(".otpverification").style.display = "block";
      otpTimer(count);
    } else {
      loginAlert.innerHTML = `This user is not registered with us ,Kindly proceed to signup`;
    }
  } else {
    loginAlert.innerHTML =
      "Kindly provide correct Phone number to verify user data";
  }

  document.querySelector("#mobile").value = "";
});

continueEmail.addEventListener("click", () => {
  document.querySelector(".login-modal-class").style.display = "none";
  document.querySelector(".signup-modal-class").style.display = "none";
  document.querySelector(".send-pswrd-to-email").style.display = "block";
});

sendPasswordEmail.addEventListener("click", () => {
  event.preventDefault();
  event.stopPropagation();
  const email = document.querySelector("#email-id").value;
  emailAlert.style.display = "block";
  if (email) {
    let registeredUser = users.filter((data) => data.email === email);
    if (registeredUser.length > 0) {
      console.log(registeredUser);
      document.querySelector("#username").innerText = registeredUser[0].name;
      document.querySelector(".send-pswrd-to-email").style.display = "none";
      document.querySelector(".otpverification").style.display = "block";
      otpTimer(30);
    } else {
      emailAlert.innerHTML = `This user is not registered with us ,Kindly proceed to signup`;
    }
  } else {
    emailAlert.innerHTML = "Kindly provide correct Email send password";
  }

  document.querySelector("#email-id").value = "";
});

resendOtp.addEventListener("click", () => {
  if (document.querySelector("#timer").innerText === "00") {
    otpTimer(30);
  }
});

function otpTimer(count) {
  let counter = setInterval(() => {
    count--;
    if (count <= 0) {
      document.querySelector("#timer").innerText = "00";
      clearInterval(counter);
      return;
    }
    document.querySelector("#timer").innerText = count;
  }, 1000);

  const otpInputs = document.querySelectorAll("#otp");
  const password = "123456";
  const userPassword = [];
  otpInputs.forEach((input) => {
    input.addEventListener("input", () => {
      userPassword.push(input.value);
      let userPass = userPassword.join("");
      if (userPass === password) {
        document.querySelector(".user-logged-in").style.display = "block";
        document.querySelector(".login-div").style.display = "none";
        document.querySelector(".otpverification").style.display = "none";
      }
    });
  });
}

document.querySelector(".login-modal").addEventListener("click", () => {
  event.stopPropagation();
});

document.querySelector(".signup-modal").addEventListener("click", () => {
  event.stopPropagation();
});

document.querySelector(".email-modal").addEventListener("click", () => {
  event.stopPropagation();
});

document.querySelector(".otpverification").addEventListener("click", () => {
  event.stopPropagation();
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  dropDownDiv.style.display = "none";
  document.querySelector(".signup-modal-class").style.display = "none";
  document.querySelector(".login-modal-class").style.display = "none";
  document.querySelector(".send-pswrd-to-email").style.display = "none";
});
