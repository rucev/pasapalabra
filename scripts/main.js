import { displayGame, displayMenu, uploadAnswer, displayQuestion, hideItem, showItem, cleanScreen, gameOver, saveRanking, loadRanking} from "./displayTools.js";
import { questions } from "./questions.js";
import { setGameInfo, setNextTurn, updateRanking } from "./gameTools.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";
  let gameInfo = {};
  let turn = 0;
  let count = 0;

  window.onload = (event) => {
    ranking = loadRanking();
  };

  let info = document.querySelector(".information");
  let score = document.querySelector(".score");
  let usernameBar = document.querySelector(".name");
  let answerBar = document.querySelector(".answer");
  let buttonStart = document.querySelector(".start");
  let buttonRank = document.querySelector(".rank");
  let buttonQuit = document.querySelector(".quit");
  let buttonSend = document.querySelector(".send");
  let buttonPass = document.querySelector(".pass");
  let buttonNext = document.querySelector(".next");
  let buttonRestart = document.querySelector(".restart");

  const letters = document.querySelectorAll(".letterCircle");
  let letter = document.querySelector(".a");

  buttonStart.addEventListener("click", (event) => {
    event.preventDefault();
    displayGame(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, answerBar);
    username = document.querySelector(".name").value;
    gameInfo = setGameInfo(questions, username)
    displayQuestion(gameInfo, turn, info)
  });

  buttonQuit.addEventListener("click", (event) => {
    event.preventDefault();
    gameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart)
  });

  buttonRestart.addEventListener("click", (event) => {
    event.preventDefault();
    saveRanking(updateRanking(gameInfo, count, ranking))
    displayMenu(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart);
    cleanScreen(letters, score, info)
    username = "";
    gameInfo = {};
    turn = 0;
  });

  buttonSend.addEventListener("click", (event) => {
    event.preventDefault();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    let userAnswer = document.querySelector(".answer").value.toLowerCase();
    gameInfo = uploadAnswer(gameInfo, turn, userAnswer, letter)
    if(gameInfo.questions[turn].isAnsweredCorrectly === false) {
      hideItem(buttonSend, buttonPass, answerBar);
      showItem(buttonNext)
      info.innerHTML = `¡Oooh! la respuesta correcta era ${gameInfo.questions[turn].answer.toUpperCase()}`;
    } else {
      count += 1
      score.innerHTML = count;
      letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
      turn = setNextTurn(gameInfo, turn, letter);
      turn >= 0 ? displayQuestion(gameInfo, turn, info) : gameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart)
    }
  });

  buttonNext.addEventListener("click", (event) => {
    event.preventDefault();
    showItem(buttonSend, buttonPass, answerBar);
    hideItem(buttonNext)
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    turn = setNextTurn(gameInfo, turn, letter);
    turn >= 0 ? displayQuestion(gameInfo, turn, info) : gameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart)
  });

  buttonPass.addEventListener("click", (event) => {
    event.preventDefault();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    turn = setNextTurn(gameInfo, turn, letter);
    turn >= 0 ? displayQuestion(gameInfo, turn, info) : gameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart)
  });


});

