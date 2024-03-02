"use strict";

const allData = {
  name: "",
  email: "",
  "phone number": "",
  "date of birth": "",
};
const theEnd = "@laragori.ge";

const sectionTwo = document.querySelector(".section-two");
const registrationForm = document.querySelector(".form-input");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const checkTick = document.querySelector(".check-tick");
const stepOne = document.querySelector(".step-one");
const phoneNumInput = document.querySelector(".phone-num-input");
const birthdayInput = document.querySelector(".birthday-input");
const eachInputBox = document.querySelector(".each-input");
const labelText = document.querySelectorAll(".label-line");
const allInputs = document.querySelectorAll(".input");
const submitBtn = document.querySelector(".submit-btn");
const linkNext = document.querySelector(".link-next");
const errMsgBox = document.querySelector(".error-msg-box");
// const firstErrBox = document.querySelector(".name");

birthdayInput.addEventListener("focus", function (e) {
  // const greenTick = e.target;
  const activeBox = e.target
    .closest(".each-input")
    .querySelector(".label-line");
  if (!activeBox) return;
  activeBox.classList.add("hidden");
});

allInputs.forEach((input) => {
  //Changing the size of input value in all boxes
  if (input === birthdayInput) {
    input.onfocus = function () {
      this.type = "date";
      // this.style.fontSize = "20px";
    };
  }
  input.onclick = function () {
    // this.style.fontSize = "20px";
  };

  input.addEventListener("blur", function (e) {
    const activeBox = e.target
      .closest(".each-input")
      .querySelector(".label-line");
    const dataName = activeBox.textContent.slice(0, -1).toLowerCase();

    // Make the input box red-ish when info is incomplete
    if (!(input.value === "") && allData[`${dataName}`] === "") {
      input.style.backgroundColor = "#e7d1caf3";
    } else {
      // Make the input box white when info is fully provided or not even started
      input.style.backgroundColor = "#fff";
    }
    // When no info is given, label is made vsible
    if (input.value === "") {
      activeBox.classList.remove("hidden");
    }
  });
  // When focused on the box, the background color is set
  input.addEventListener("focus", function (e) {
    input.style.backgroundColor = "#e9ecef";
  });
});

function getValue(eachname) {
  // let txt = document.querySelector(`.${eachname}`).value;
  // return txt;
}
const checkNameEmail = function () {
  if (allData.name && allData.email) {
    checkTick.classList.remove("hidden");
    stepOne.classList.add("hidden");
  } else {
    checkTick.classList.add("hidden");
    stepOne.classList.remove("hidden");
  }
};

const nameValidation = function (valueType) {
  const greenTick = nameInput
    .closest(".each-input")
    .querySelector(".green-tick");
  if (valueType.length >= 3) {
    greenTick.classList.remove("hidden");
    allData.name = valueType;
    checkNameEmail();
    if (document.querySelector(".name")) {
      document.querySelector(".name").classList.add("hidden");
    }
  }
  if (valueType.length < 3) {
    greenTick.classList.add("hidden");
    allData.name = "";
    checkNameEmail();
  }
};

const emailValidation = function (valueType) {
  const greenTick = emailInput
    .closest(".each-input")
    .querySelector(".green-tick");
  if (
    valueType.endsWith(theEnd) &&
    !valueType.slice(0, -theEnd.length).includes("@")
  ) {
    greenTick.classList.remove("hidden");
    allData.email = valueType;
    checkNameEmail();
    if (document.querySelector(".email")) {
      document.querySelector(".email").classList.add("hidden");
    }
  } else {
    greenTick.classList.add("hidden");
    allData.email = "";
    checkNameEmail();
  }
};
const phoneValidation = function (valueType) {
  const greenTick = phoneNumInput
    .closest(".each-input")
    .querySelector(".green-tick");
  if (
    valueType.length === 9 &&
    !isNaN(valueType) &&
    valueType.startsWith("5")
  ) {
    greenTick.classList.remove("hidden");
    allData["phone number"] = +valueType;
    console.log(allData["phone number"]);
    console.log(typeof allData["phone number"]);
    console.log(valueType);
    console.log(typeof valueType);
    if (document.querySelector(".number")) {
      document.querySelector(".number").classList.add("hidden");
    }
  } else {
    greenTick.classList.add("hidden");
    allData["phone number"] = "";
  }
};
const dateValidation = function (valueType) {
  const greenTick = birthdayInput
    .closest(".each-input")
    .querySelector(".green-tick");
  const [year, month, day] = valueType.split("-");

  if (year > 1930 && year.length === 4) {
    birthdayInput.type = "text";
    greenTick.classList.remove("hidden");
    allData["date of birth"] = +valueType.replaceAll("-", "");
    console.log(valueType);
    console.log(typeof valueType);
    console.log(allData["date of birth"]);
    console.log(typeof allData["date of birth"]);
    if (document.querySelector(".birth")) {
      document.querySelector(".birth").classList.add("hidden");
    }
  } else {
    greenTick.classList.add("hidden");
    birthdayInput.type = "date";
    allData["date of birth"] = "";
  }
};
registrationForm.addEventListener("input", function (e) {
  const eachValue = e.target.closest(".each-input").querySelector(".input");
  const activeBox = e.target
    .closest(".each-input")
    .querySelector(".label-line");
  const greenTick = e.target
    .closest(".each-input")
    .querySelector(".green-tick");
  const valueType = eachValue.value;
  stepOne.style.color = "#19c77fe0";
  if (!activeBox) return;
  activeBox.classList.add("hidden");
  eachValue.style.backgroundColor = "#c8f5f0";
  //Name - must be at least 3 characters
  if (eachValue === nameInput) {
    localStorage.setItem("name", JSON.stringify(eachValue.value));
    nameValidation(valueType);
  }
  //must be finished with @laragori.ge
  if (eachValue === emailInput) {
    localStorage.setItem("email", JSON.stringify(eachValue.value));
    emailValidation(valueType);
  }
  //Phone N - must be only 9 and only numbers starting with 5
  if (eachValue === phoneNumInput) {
    localStorage.setItem("phoneNumber", JSON.stringify(eachValue.value));
    phoneValidation(valueType);
  }
  if (eachValue === birthdayInput) {
    localStorage.setItem("dateOfBirth", JSON.stringify(eachValue.value));
    dateValidation(valueType);
  }
});

window.addEventListener("load", function () {
  localStorage.setItem("allData", JSON.stringify(allData));
  const dataName = JSON.parse(localStorage.getItem("name"));
  const dataEmail = JSON.parse(localStorage.getItem("email"));
  const dataPhoneNum = JSON.parse(localStorage.getItem("phoneNumber"));
  const dateOfBirth = JSON.parse(localStorage.getItem("dateOfBirth"));
  if (dataName) {
    nameInput.value = dataName;
    nameInput
      .closest(".each-input")
      .querySelector(".label-line")
      .classList.add("hidden");
    nameValidation(dataName);
  }
  if (dataEmail) {
    emailInput.value = dataEmail;
    emailInput
      .closest(".each-input")
      .querySelector(".label-line")
      .classList.add("hidden");
    emailValidation(dataEmail);
  }
  if (dataPhoneNum) {
    phoneNumInput.value = dataPhoneNum;
    phoneNumInput
      .closest(".each-input")
      .querySelector(".label-line")
      .classList.add("hidden");
    phoneValidation(dataPhoneNum);
  }
  if (dateOfBirth) {
    birthdayInput.value = dateOfBirth;
    birthdayInput
      .closest(".each-input")
      .querySelector(".label-line")
      .classList.add("hidden");
    dateValidation(dateOfBirth);
  }
});

submitBtn.addEventListener("click", function (e) {
  const labelTxtArr = [];
  //check if all data is provided correctly
  errMsgBox.innerHTML = "";
  for (let [key, value] of Object.entries(allData)) {
    if (value === "") {
      const html = `
  <div class="error-msg  ${key}">
    <div class="err-first-line">
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="err-red-icon"
        >
          <path
            fill-rule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clip-rule="evenodd"
          />
        </svg>
        Invalid ${key}</span
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="x-icon"
      >
        <path
          d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
        />
      </svg>
    </div>
    <div class="line"></div>
    <p>Please enter valid ${key}</p>
  </div>`;
      errMsgBox.insertAdjacentHTML("beforeend", html);
    } else {
      labelTxtArr.push(value);
      console.log(labelTxtArr[3]);
      console.log(typeof labelTxtArr[3]);
    }
  }
  const errMsgs = errMsgBox.querySelectorAll(".error-msg");
  errMsgs.forEach((each) => {
    each.style.animationName = "openError";
  });
  errMsgBox.addEventListener("click", function (e) {
    const clickedBoxIcon = e.target.closest(".x-icon");
    if (!clickedBoxIcon) return;
    const clickedBox = clickedBoxIcon.closest(".error-msg");
    clickedBox.classList.add("hidden");
  });
  if (labelTxtArr.length === allInputs.length) {
    console.log(`win is a win`);
    console.log(allData);
    localStorage.setItem("allPersonalInfo", JSON.stringify(labelTxtArr));
    localStorage.setItem("allPersonalInfoTwo", JSON.stringify(allData));
    linkNext.href = "index3.html";
  }
});
