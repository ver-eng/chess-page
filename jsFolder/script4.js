"use strict";
const successImage = document.querySelector(".success-image");
const successMsg = document.querySelector(".success-msg");

const dataSecondPage = JSON.parse(localStorage.getItem("allPersonalInfoTwo"));
const dataThirdPage = JSON.parse(localStorage.getItem("dataThirdpageObj"));

const deleteLocalStorage = function () {
  localStorage.removeItem("allPersonalInfo");
  // localStorage.removeItem("allPersonalInfoTwo");
  localStorage.removeItem("dataThirdpage");
  localStorage.removeItem("dataThirdpageObj");
  localStorage.removeItem("allData");
  localStorage.removeItem("dateOfBirth");
  localStorage.removeItem("character");
  localStorage.removeItem("level");
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("participated");
};
deleteLocalStorage();
