let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&', '#', '$'];
let main = document.getElementById("captcha");
let clickOn = document.getElementById("b");
let form = document.querySelector('#shelterForm');
let input = document.querySelector(".input-Captcha");
let verifyCaptcha = document.querySelector('#submit');
let feedback = document.createElement('div');
let char;
let time = document.createElement('span');
let timer = document.querySelector('.container');
let countdown;

function regenerate() {
    main.innerHTML = "";
    let j = Math.floor(Math.random() * 2) + 5;
    for (let i = 1; i <= j; i++) {
        let r = Math.floor(Math.random() * arr.length);
        char = `${arr[r]}`;
        let span = document.createElement('span');
        span.innerHTML = char;
        let rotation = Math.floor(Math.random() * 40) - 25;
        span.style.display = 'inline-block';
        span.style.margin = `0px 2px`;
        span.style.fontSize = `3rem`;
        span.style.transform = `rotate(${rotation}deg)`;
        main.appendChild(span);
    }
}

function timerStatus() {
    clearInterval(countdown);
    time.style.fontSize = "1.3rem"
    time.style.fontWeight = "600"
    let i = 59;
    countdown = setInterval(function () {
        if (i == 0) {
            time.textContent = 'Time is up, Regenerating new captcha';
            clearInterval(countdown);
            main.innerHTML = "";
            regenerate();
            timerStatus();
        }
        else {
            time.textContent = `Time remaining ${i} seconds`;
        }
        i--;
    }, 1000);
}

regenerate();
timer.appendChild(time);
timerStatus();

clickOn.addEventListener("click", function () {
    feedback.textContent = "";
    let i = 0;
    let g = "Generating";
    main.style.fontSize = `2.5rem`;
    for (i = 0; i <= 3; i++) {
        setTimeout(function () {
            g += ".";
            main.innerHTML = g;
        }, i * 750);
    }
    clickOn.style.backgroundColor = "black";
    clickOn.style.color = "orange";
    clickOn.style.boxShadow = `0px 3px 3px 2px yellow`;
    setTimeout(function () {
        main.style.fontSize = `3rem`;
        clickOn.style.backgroundColor = "orange";
        clickOn.style.color = "black";
        clickOn.style.boxShadow = `none`;
        regenerate();
        timerStatus();
    }, 3000);
});

form.addEventListener("submit", function (evt) {
    feedback.textContent = "";
    evt.preventDefault();
    let inputC = input.value;
    let feedbackBox = document.querySelector('#feedback');
    if (main.textContent == inputC) {
        feedback.textContent = "Captcha matched!!";
        feedback.style.color = "green";
    }
    else {
        feedback.textContent = "Invalid Captcha";
        feedback.style.color = "red"
    }
    input.value = "";
    feedbackBox.append(feedback);
});
