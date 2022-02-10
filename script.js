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
let circleValueInterval;

function updateInnerHtml (){
    document.querySelector("#timer p").innerHTML = `${
        minutes / 60 >= 10 ? minutes / 60 : "0" + minutes / 60
    }:${seconds < 10 ? "0" + seconds : seconds}`;
}

let handle;

const ActionsPlay = {
    removeButtons() {
        remover.style.display = "none"
        add.style.display = "none"
    },

    addButtons() {
        remover.style.display = "flex"
        add.style.display = "flex"
    },
}

const Update = {
    updateCircle() {
        circle.style.strokeDashoffset = circleValue += circleValueInterval;
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

const ActionButtons = {
    add() {
        minutes = minutes + 60;
        updateInnerHtml()
    },

    remove() {
        if (minutes > 0) {
            minutes = minutes - 60;
            updateInnerHtml()

        } else {
            alert("Valor mínimo alcançado");
        }
    },

    activeTimer() {
        ActionsPlay.removeButtons();
        circleValueInterval = 875 / minutes
        handle = setInterval(() => {
            if (minutes > 0) {
                Update.updateMinutes();
                Update.updateValues();
            } else if (minutes === 0) {
                AudioPlay.playAudio();
                ActionsPlay.addButtons();
            }
        }, 1000);
    }
};

updateInnerHtml();

buttonAudio.addEventListener("click", AudioPlay.pauseAudio);

add.addEventListener("click", ActionButtons.add);
remover.addEventListener("click", ActionButtons.remove);
playPomodoro.addEventListener("click", ActionButtons.activeTimer);
