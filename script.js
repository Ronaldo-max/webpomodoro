const remover = document.getElementById("remove");
const add = document.getElementById("add");
const playPomodoro = document.getElementById("play");

const circle = document.querySelector("circle");
const audio = document.querySelector("audio");

const buttonAudio = document.getElementById("buttonAudio");

let timer = 25;

let minutes = timer * 60;
let seconds = minutes % 60;

let circleValue = 875;
let cricleValueInterval = 875 / minutes;

const Update = {
    updateCircle() {
        circle.style.strokeDashoffset = circleValue += cricleValueInterval;
    },

    updateValues() {
        let minutesValue = Math.floor(minutes / 60);
        let secondsValue = minutes % 60;

        document.querySelector("#timer p").innerHTML = `${
            minutesValue >= 10 ? minutesValue : "0" + minutesValue
        }:${secondsValue < 10 ? "0" + secondsValue : secondsValue}`;
    },

    updateMinutes() {
        if (minutes > 0) {
            minutes--;

            Update.updateCircle();
        }
    },
};

const AudioPlay = {
    playAudio() {
        audio.play();
    },
    pauseAudio() {
        if (minutes == 0) {
            audio.pause();
            clearInterval(handle);
        }
    },
};
let handle;
function activeTimer() {
    handle = setInterval(() => {
        if (minutes > 0) {
            Update.updateMinutes();
            Update.updateValues();
        } else if (minutes === 0) {
            AudioPlay.playAudio();
        }
    }, 1000);
}

document.querySelector("#timer p").innerHTML = `${
    minutes / 60 >= 10 ? minutes / 60 : "0" + minutes / 60
}:${seconds < 10 ? "0" + seconds : seconds}`;

buttonAudio.addEventListener("click", AudioPlay.pauseAudio);
playPomodoro.addEventListener("click", activeTimer);
