// CountDown
const countdown = document.querySelector('.countdown');
const timer = document.querySelector('.timer');
var countDownDate = new Date("01/01/2024 00.00").getTime();

var x = setInterval(function() {
    getDate();
}, 1000);

// Get Content
function getContent() {
    const txtTitle = document.querySelector('.title');
    const txtMessage = document.querySelector('.message');

    var date = new Date();
    if (localStorage.getItem('title')) {
        txtTitle.textContent = localStorage.getItem('title');
    } else {
        txtTitle.textContent = `Tahun Baru ${date.getFullYear() + 1}`;
    }
    if (localStorage.getItem('message')) {
        txtMessage.textContent = localStorage.getItem('message');
    } else {
        txtMessage.textContent = "Ubah pesan ini dengan klik pengaturan di bawah.";
    }
    if (localStorage.getItem('date') || localStorage.getItem('time')) {
        countDownDate = new Date(`${localStorage.getItem('date')} ${localStorage.getItem('time')}`).getTime();
    } else {
        countDownDate = new Date(`01/01/${date.getFullYear() + 1} 00:00`).getTime();
    }
}

// Get Date
function getDate() {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    if (days == 0) {
        countdown.textContent = `${getNum(hours)}:${getNum(minutes)}:${getNum(seconds)}`;
        timer.textContent = "( Coming Soon! )";
    } else {
        countdown.textContent = `${days}H`;
        timer.textContent = `( ${getNum(hours)}:${getNum(minutes)}:${getNum(seconds)} )`;
    }
}

function getNum(value) {
    return ('0' + value).slice(-2);
}

// RUN
getContent();
getDate();

// Switch
const main = document.querySelector('.main');
const setting = document.querySelector('.setting');
const button = document.querySelector('.switch');
const imgButton = document.querySelector('.switch img');

setTimeout(() => {
    main.classList.remove('startup');
    main.classList.add('run');
    button.classList.add('active');
}, 1300);

button.addEventListener('click', () => {
    if (main.classList.contains('active')) {
        const title = document.querySelector('#title').value;
        const message = document.querySelector('#message').value;
        const date = document.querySelector('#date').value;
        const time = document.querySelector('#time').value;

        if (title.length == 0 || message.length == 0 || date.length == 0) {
            alert("Lengkapi data dulu kak!");
        } else {
            localStorage.setItem("title", title);
            localStorage.setItem("message", message);
            localStorage.setItem("date", date);
            localStorage.setItem("time", time);

            getContent();

            imgButton.src = "images/settings.svg";
            main.classList.toggle('active');
            setting.classList.toggle('active');
            setTimeout(() => {
                setting.style = "display: none;";
            }, 800);
        }
    } else {
        if (localStorage.getItem('title') != "") {
            title.value = localStorage.getItem('title');
        }
        if (localStorage.getItem('message') != "") {
            message.value = localStorage.getItem('message');
        }
        if (localStorage.getItem('date') != "") {
            date.value = localStorage.getItem('date');
        }
        if (localStorage.getItem('time') != "") {
            time.value = localStorage.getItem('time');
        }

        imgButton.src = "images/check.svg";
        setting.style = "display: flex;";
        setTimeout(() => {
            main.classList.toggle('active');
            setting.classList.toggle('active');
        }, 100);
    }
});