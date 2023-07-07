const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('BODY');
let timierId;

startBtn.addEventListener('click', handllerStart);
stopBtn.addEventListener('click', handllerStop);
handlerDisabled(stopBtn, startBtn);

function handllerStart() {
  handlerDisabled(startBtn, stopBtn);
  timierId = setInterval(setBgColor, 1000);
}

function handllerStop() {
  handlerDisabled(stopBtn, startBtn);
  clearInterval(timierId);
}

function handlerDisabled(doNotActiveBtn, doActiveBtn) {
  if (!doNotActiveBtn.hasAttribute('disabled')) {
    doNotActiveBtn.setAttribute('disabled', '');
    doActiveBtn.removeAttribute('disabled');
  }
}

function setBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
