const playPomodoro = document.getElementById("play");
const circle = document.querySelector("circle");
const audio = document.querySelector("audio");
const buttonAudio = document.getElementById("buttonAudio");
const reset = document.getElementById("reset");
const textInterval = document.getElementById("interval");

const cicles = document.getElementById("cicles");

let timer = 25;
let minutesFixed = timer * 60;
let minutes = timer * 60;
let seconds = minutes % 60;

let ciclesTime = 0;

let interval = 5;
let minutesIntervalFixed = interval * 60;
let minutesInterval = interval * 60;

let circleValue = 875;
let circleValueInterval;

circleValueInterval = 875 / minutes

let updateTimerMinutesSeconds;
let updateTimerInterval;

const Update = {
    updateMinutes() {
        if (minutes > 0) {
            minutes--;
            Update.updateInnerHtml();
        }
    },

    updateInterval() {
        if (minutesInterval > 0) {
            minutesInterval--;
            Update.updateInnerHtml();
        }
    },

    updateInnerHtml (){
        let min = Math.floor(minutes / 60)
        let sec = minutes % 60

        let intervalMin = Math.floor(minutesInterval / 60)
        let intervalSec = minutesInterval % 60
    
        document.querySelector("#timer p").innerHTML =
            `${ min >= 10 ? min : "0" + min}:${sec < 10 ? "0" + sec : sec}`;

        document.querySelector("#cicles").innerHTML = ciclesTime;

        textInterval.innerHTML =
        `${ intervalMin >= 10 ? intervalMin : "0" + intervalMin}:${intervalSec < 10 ? "0" + intervalSec : intervalSec}`;
    },

    updateCircle() {
        circle.style.strokeDashoffset = circleValue += circleValueInterval;
    },

    updateIntervalTimer() {
        updateTimerInterval = setInterval(() => {
            if (minutes === 0 && minutesInterval > 0) {
                Update.updateInterval();
                Update.updateInnerHtml();
            } else if (minutesInterval === 0){
                AudioPlay.playAudio();
                clearInterval(updateTimerInterval);
            }
        }, 1000)
    },
};

const AudioPlay = {
    playAudio() {
        audio.play();
    },
    pauseAudio() {
        audio.pause();

        if (minutes == 0 && minutesInterval > 0) {
            Update.updateIntervalTimer();
        } else if (minutesInterval == 0 && minutes == 0) {
            minutesInterval = minutesIntervalFixed;
            minutes = minutesFixed;
            Update.updateInnerHtml();
            // UPDATE CIRCLE
            circleValueInterval = 875 / minutes;
            circleValue = 875;
            circle.style.strokeDashoffset = 0;
        }
    },
};

const ActionButtons = {
    activeTimer() {
        updateTimerMinutesSeconds = setInterval(() => {
            if (minutes > 0) {
                Update.updateMinutes();
                Update.updateInnerHtml();
                Update.updateCircle()
            } else if (minutes === 0) {
                clearInterval(updateTimerMinutesSeconds)
                AudioPlay.playAudio();
                ciclesTime += 1;
                Update.updateInnerHtml();

                circleValueInterval = 0;
                circleValue = 875;
                circle.style.strokeDashoffset = 0;
            }
        }, 1000);
    },

    reset() {
        clearInterval(updateTimerMinutesSeconds);
        clearInterval(updateTimerInterval);

        circleValueInterval = 0;
        circleValue = 875;
        circle.style.strokeDashoffset = 0;

        minutes = minutesFixed;
        minutesInterval = minutesIntervalFixed;
        Update.updateInnerHtml();
    },
};

Update.updateInnerHtml();

buttonAudio.addEventListener("click", AudioPlay.pauseAudio);
playPomodoro.addEventListener("click", ActionButtons.activeTimer);
reset.addEventListener("click", ActionButtons.reset);
