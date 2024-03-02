"use strict";

const dataThirdPage = { level: "", charachter: "", participated: "" };
const dataSecondPage = JSON.parse(localStorage.getItem("allPersonalInfoTwo"));

const url = "https://api.accepted.ge/api/chess/collect";

const chooseALevelHeading = document.querySelector(".knowledge-heading");
const chooseALevelBox = document.querySelector(".each-level");
const charachterHeading = document.querySelector(".character-heading");
const chooseChessPlayer = document.querySelector(".chess-characters");
const arrows = document.querySelectorAll(".arrow");
const secondArrows = document.querySelectorAll(".second-arrow");
const levelBox = document.querySelector(".each-level");
const eachLevel = document.querySelectorAll(".level");
const knowledgeParagragh = document.querySelector(".knowledge-para");
const eachLinePlayer = document.querySelectorAll(".each-line-player");
const chessPlayerBox = document.querySelector(".chess-characters");
const totalNumPlayers = document.querySelector(".total");
const playerCharacter = document.querySelector(".player-character");
const chessPlayerPhotoSm = document.querySelector(".little-chess-player-photo");
const chessPlayerPhotoBig = document.querySelector(".chessplayer-photos");
const eachYesNoBox = document.querySelectorAll(".each-yes-no-box");
const bothBoxes = document.querySelector(".yes-no-boxes");
const yesBox = document.querySelector(".yes-div");
const noBox = document.querySelector(".no-div");
const yes = document.querySelector(".yes-box");
const no = document.querySelector(".no-box");
const innerYes = document.querySelector(".inner-yes");
const innerNo = document.querySelector(".inner-no");
const submitBtn = document.querySelector(".submit-btn");
const errorMsg1 = document.querySelector(".tooltiptext-one");
const errorMsg2 = document.querySelector(".tooltiptext-two");
const errorMsg3 = document.querySelector(".tooltiptext-three");
const thirdQuestion = document.querySelector(".partic-question");
const linkNext = document.querySelector(".link-next");
const secondStepTwo = document.querySelector(".second-step-two");
const checkTick = document.querySelector(".check-tick-two");

const getChessplayersInfo = async function () {
  try {
    const dataPromise = await fetch("https://api.accepted.ge/api/chess/index");

    if (!dataPromise)
      throw new Error(`Cannot access the information, please try again`);
    const data = await dataPromise.json();

    rendercharacterPlayers(data);
  } catch (err) {
    console.log(err);
  }
};
const rendercharacterPlayers = function (data) {
  totalNumPlayers.textContent = `(Total ${data.length})`;
  data.forEach((eachPlayer) => {
    const html = `<div class="each-line-player">
    <p class="full-name">${eachPlayer.name}</p>
    <img
      src= 'https://api.accepted.ge/${eachPlayer.image}'
      class="chessplayer-photos"
      alt="Photo of a chess player"
    />
  </div>`;
    chooseChessPlayer.insertAdjacentHTML("beforeend", html);
  });
};
getChessplayersInfo();

const showFirsthiddenBox = function () {
  if (chooseALevelBox.classList.contains("hidden")) {
    chooseALevelBox.style.animation = "slide_down_level 700ms forwards";
    chooseALevelBox.classList.remove("hidden");
  } else {
    chooseALevelBox.style.animation = "slide_up_level 700ms forwards";

    chooseALevelBox.classList.add("hidden");
  }
  //2. the arrow changes
  arrows.forEach((arrow) => arrow.classList.toggle("hidden"));
};
const showPlayersHiddenBox = function () {
  if (chooseChessPlayer.classList.contains("hidden")) {
    chooseChessPlayer.style.animation = "slide_down_player 700ms";
    chooseChessPlayer.classList.remove("hidden");
  } else {
    chooseChessPlayer.style.animation = "slide_up_player 700ms";
    chooseChessPlayer.classList.add("hidden");
  }
  secondArrows.forEach((arrow) => arrow.classList.toggle("hidden"));
};
chooseALevelHeading.addEventListener("click", showFirsthiddenBox);

charachterHeading.addEventListener("click", showPlayersHiddenBox);

eachLevel.forEach((level) => {
  level.addEventListener("click", function (e) {
    knowledgeParagragh.textContent = level.textContent;
    dataThirdPage.level = level.textContent;
    secondStepTwo.style.color = "#19c77fe0";
    errorMsg1.style.opacity = "0";
    localStorage.setItem("level", JSON.stringify(dataThirdPage.level));
    showFirsthiddenBox();
    greenCheckmark();
  });
});

chessPlayerBox.addEventListener("click", function (e) {
  const selectPlayer = e.target.closest(".each-line-player");
  const eachPhoto = selectPlayer.querySelector(".chessplayer-photos");

  if (selectPlayer) {
    playerCharacter.textContent = selectPlayer.textContent;
    dataThirdPage.charachter = selectPlayer.textContent.trim();
    secondStepTwo.style.color = "#19c77fe0";
    errorMsg2.style.opacity = "0";
    localStorage.setItem("character", JSON.stringify(dataThirdPage.charachter));

    chessPlayerPhotoSm.classList.remove("hidden");
    chessPlayerPhotoSm.src = `${eachPhoto.src}`;
    showPlayersHiddenBox();
    greenCheckmark();
  }
});

bothBoxes.addEventListener("click", function (e) {
  const clickedBox = e.target.closest(".each-yes-no-box");
  secondStepTwo.style.color = "#19c77fe0";
  if (clickedBox === yesBox) {
    dataThirdPage.participated =
      clickedBox.querySelector(".answer").textContent;

    innerYes.classList.remove("hidden");
    innerNo.classList.add("hidden");
    innerYes.style.animation = "clicked 400ms forwards";
    errorMsg3.style.opacity = "0";
    greenCheckmark();
  }
  if (clickedBox === noBox) {
    dataThirdPage.participated =
      clickedBox.querySelector(".answer").textContent;
    innerNo.classList.remove("hidden");
    innerYes.classList.add("hidden");
    innerNo.style.animation = "clicked 400ms forwards";
    errorMsg3.style.opacity = "0";
    greenCheckmark();
  }
  localStorage.setItem(
    "participated",
    JSON.stringify(dataThirdPage.participated)
  );
});
window.addEventListener("load", function () {
  const level = JSON.parse(localStorage.getItem("level"));
  const character = JSON.parse(localStorage.getItem("character"));
  const participated = JSON.parse(localStorage.getItem("participated"));
  if (level) {
    knowledgeParagragh.textContent = level;
    dataThirdPage.level = level;
    secondStepTwo.style.color = "#19c77fe0";
  }
  if (character) {
    playerCharacter.textContent = character;
    dataThirdPage.charachter = character;
    secondStepTwo.style.color = "#19c77fe0";
  }
  if (participated === "Yes") {
    innerYes.classList.remove("hidden");
    innerYes.style.animation = "clicked 400ms forwards";
    dataThirdPage.participated = participated;
    secondStepTwo.style.color = "#19c77fe0";
  }
  if (participated === "No") {
    innerNo.classList.remove("hidden");
    innerNo.style.animation = "clicked 400ms forwards";
    dataThirdPage.participated = participated;
    secondStepTwo.style.color = "#19c77fe0";
  }
  greenCheckmark();
});

const greenCheckmark = function () {
  if (
    dataThirdPage.level &&
    dataThirdPage.charachter &&
    dataThirdPage.participated
  ) {
    checkTick.classList.remove("hidden");
    secondStepTwo.classList.add("hidden");
  }
};

submitBtn.addEventListener("click", function (e) {
  const labelTxtArr = [];

  for (let [key, value] of Object.entries(dataThirdPage)) {
    if (value === "") {
      if (key === "level") {
        errorMsg1.style.visibility = "visible";
        errorMsg1.style.opacity = "1";
      }
      if (key === "charachter") {
        errorMsg2.style.opacity = "1";
      }
      if (key === "participated") {
        errorMsg3.style.opacity = "1";
      }
    } else {
      labelTxtArr.push(value);
    }
  }
  if (labelTxtArr.length === 3) {
    dataSecondPage.id = 1;
    dataThirdPage.id = 2;
    dataThirdPage.level = dataThirdPage.level.toLowerCase();
    if (dataThirdPage.level === "intermediate") dataThirdPage.level = "middle";
    dataThirdPage.participated =
      dataThirdPage.participated === "Yes" ||
      dataThirdPage.participated === "true"
        ? true
        : false;
    console.log(dataSecondPage);
    console.log(dataThirdPage);

    Promise.all([
      sendData(dataSecondPage, url),
      sendData(dataThirdPage, url),
    ]).then((res) => {
      console.log("done");
      console.log(res);
      window.location.href = "index4.html";
    });
  }
});

const sendData = async function (data, url) {
  try {
    const fetchData = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!fetchData.ok) {
      throw new Error(
        "There was a problem sending the data 😢, please try again!"
      );
    }
    const sentData = await fetchData.json();
    return sentData;
  } catch (err) {
    console.log(err);
  }
};
