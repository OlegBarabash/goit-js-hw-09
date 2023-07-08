import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  inputDate: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const SECOND = 1000;
let timer = 0;

ref.startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer = selectedDates[0].getTime() - new Date().getTime();
    if (timer < 0) {
      window.alert('Please choose a date in the future');
      return;
    }
    disabledStartBtn(false);
    setTimerDate(convertMs(timer));
  },
};

flatpickr(ref.inputDate, options);
disabledStartBtn(true);

function disabledStartBtn(disabled) {
  if (disabled) {
    if (!ref.startBtn.hasAttribute('disabled')) {
      ref.startBtn.setAttribute('disabled', '');
    }
    return;
  }
  ref.startBtn.removeAttribute('disabled');
}

function setTimerDate(date) {
  ref.days.textContent = addLeadingZero(date.days);
  ref.hours.textContent = addLeadingZero(date.hours);
  ref.minutes.textContent = addLeadingZero(date.minutes);
  ref.seconds.textContent = addLeadingZero(date.seconds);
}

function startTimer(date) {
  const intervId = setInterval(() => {
    disabledStartBtn(true);
    if (timer <= 0) {
      clearInterval(intervId);
      window.alert('TIME OUT!');
      disabledStartBtn(false);
      return;
    }
    setTimerDate(convertMs(timer));
    timer -= SECOND;
  }, SECOND);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
