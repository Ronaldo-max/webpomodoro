const playPomodoro = document.getElementById("play");
const circle = document.querySelector("circle");
const audio = document.querySelector("audio");
const buttonAudio = document.getElementById("buttonAudio");
const reset = document.getElementById("reset");

const cicles = document.getElementById("cicles");

let timer = 1;
let minutesFixed = timer * 60;
let minutes = timer * 60;
let seconds = minutes % 60;

let ciclesTime = 0;

let interval = 1;
let minutesInterval = interval * 60;

let circleValue = 875;
let circleValueInterval;

circleValueInterval = 875 / minutes

let updateTimeSetInterval;

const Update = {
    updateMinutes() {
        if (minutes > 0) {
            minutes--;
            Update.updateInnerHtml();
        }
    },

    updateInnerHtml (){
        let min = Math.floor(minutes / 60)
        let sec = minutes % 60
    
        document.querySelector("#timer p").innerHTML =
            `${ min >= 10 ? min : "0" + min }:${sec < 10 ? "0" + sec : sec}`;

        document.querySelector("#cicles").innerHTML = ciclesTime;
    },

    updateCircle() {
        circle.style.strokeDashoffset = circleValue += circleValueInterval;
    },
};

const AudioPlay = {
    playAudio() {
        audio.play();
    },
    pauseAudio() {
        audio.pause();
    },
};

const ActionButtons = {
    activeTimer() {
        updateTimeSetInterval = setInterval(() => {
            if (minutes > 0) {
                Update.updateMinutes();
                Update.updateInnerHtml();
                Update.updateCircle()
            } else if (minutes === 0) {
                    clearInterval(updateTimeSetInterval)
                    AudioPlay.playAudio();
                    ciclesTime += 1
                    minutes = minutesInterval;
                    Update.updateInnerHtml();
            }
        }, 1000);
    },

    reset() {
        clearInterval(updateTimeSetInterval);

        circleValueInterval = 0;
        circleValue = 875;
        circle.style.strokeDashoffset = 0;

        minutes = minutesFixed;
        Update.updateInnerHtml();
    },
};

Update.updateInnerHtml();

buttonAudio.addEventListener("click", AudioPlay.pauseAudio);
playPomodoro.addEventListener("click", ActionButtons.activeTimer);
reset.addEventListener("click", ActionButtons.reset);
