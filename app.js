const months = [
    'january', 'february', 'march', 'april', 'may', 'june', 'july', 'augest', 'september', 'october', 'november', 'december'
]

const weekdays = ['sun', 'mon', 'tues', 'wednes', 'thurs', 'fri', 'satur']

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4')

// console.log(items);
const futureDate = new Date(2020,10,19, 12, 30 ,0) //End Time (Year, month, date, hour, minute, second) hour in 24hour format

// console.log(futureDate);

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
const month = futureDate.getMonth()
const date = futureDate.getDate()
const day = futureDate.getDay()

function formatTime(h, m) {
    if (h >= 12) {
        var timeString = h + ":" + m;
        var H = timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        return timeString;
    }
    return `${h}:${m}am`

}

giveaway.textContent = `Giveaway ends on ${date} ${months[month]} ${year}, ${weekdays[day]}day, ${formatTime(hours, minutes)}.`


//future time
const futureTime = futureDate.getTime()
// console.log(futureTime);

function format(value) {
    if (value < 10) {
        return (`0${value}`)
    }
    return value
}

function getRemaningTime() {
    const todayTime = new Date().getTime();
    const diffTime = futureTime - todayTime;
    //one Day
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMin = 60 * 1000;

    let days = Math.floor(diffTime / oneDay);
    const hours = Math.floor((diffTime % oneDay) / oneHour);
    const minutes = Math.floor((diffTime % oneHour) / oneMin);
    const seconds = Math.floor((diffTime % oneMin) / 1000);

    const values = [days, hours, minutes, seconds];

    items.forEach((i, j) => {
        i.innerHTML = format(values[j]);
    })
    if (diffTime < 0) {
        clearInterval(countdown);
        deadline.innerHTML = "Sorry..!! Giveaway Expired..!!"
    }
}

let countdown = setInterval(getRemaningTime, 1000)
getRemaningTime();