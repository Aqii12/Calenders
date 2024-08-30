const clockTime = document.querySelector(".clock .time");
const clockDate = document.querySelector(".clock .date");

const calendarDate = document.querySelector(".calendar .current-date");
const calendarDays = document.querySelector(".calendar .days");
const calendarPrevNext = document.querySelectorAll(".calendar .icons span");

const calendarShow = document.querySelector(".calendar .show");
const calendarHide = document.querySelector(".calendar .hide");
const calendarYear = document.querySelector(".calendar .hide input");
const calendarMonths = document.querySelector(".calendar .hide .months");
const calendarBtns = document.querySelectorAll(".calendar .hide button");






const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let d = new Date();
let day = d.getDay();  // return 0 to 6 <=> Sunday to Saturday
let date = d.getDate();
let month = d.getMonth(); // return 0 to 11 <=> january to december
let year = d.getFullYear();
let hour = d.getHours();
let count = 0;

// * Calendar
function renderCalendar(){
    let lists = ``;

    // * lastDateOfLastMonth = 31 <=> Last month has 31 days
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();

    // * lastDateOfCurrentMonth = 30 <=> current month has 30 days
    const lastDateOfCurrentMonth = new Date(year, month + 1, 0).getDate();

    // * firstDayOfCurrentMonth = 4 <=> thursday
    const firstDayOfCurrentMonth = new Date(year, month, 1).getDay();

     // * firstDayOfNextMonth = 6 <=> saturday
     const firstDayOfNextMonth = new Date(year, month + 1, 1).getDay();

     for(let i = firstDayOfCurrentMonth; i > 0; i--){
        lists += `<li class="inactive">${lastDateOfLastMonth -i + 1}</i>`
     }

     for(let i = 1; i <= lastDateOfCurrentMonth; i++){
        lists += `<li class="${isToday(i) ? "active" : ""}">${i}</i>`
     }

     for(let i = firstDayOfNextMonth; i < 7; i++){
        lists += `<li class="inactive">${i - firstDayOfNextMonth + 1}</i>`
     }

     calendarDate.innerText = `${months[month]} ${year}`
     calendarDays.innerHTML = lists;
     calendarYear.value = year;
     renderCalendarMonths();

}
renderCalendar();

function isToday(day){
    const cy = new Date().getFullYear();
    const cm = new Date().getMonth();
    const cd = new Date().getDate();

    return day === cd && month === cm && year === cy;
}

// * Calendar Prev And Next <>
calendarPrevNext.forEach(icon =>{
    icon.addEventListener("click", () =>{
        console.log(icon);
        month = icon.id === "prev" ? month - 1 : month + 1;
        if(month < 0 || month > 11){
            const d = new Date(year, month);
            month = d.getMonth();
            year = d.getFullYear();
        }
        renderCalendar();
    })
})

// *Change Month and Year
calendarDate.addEventListener("click", ()=>{
    calendarShow.style.display = "none";
    calendarHide.style.display = "block";
});

function renderCalendarMonths(){
    let lists = ``;
    months.forEach((m, index) =>{
        lists += `<li class="${index === month ? 'active' : ''}"onClick="setMonth(${index})">${m}</li>`
    })
    calendarMonths.innerHTML = lists;
}


function setMonth(m){
    month = m;
    renderCalendarMonths();
}

// *Calendar btn OK & Reset
calendarBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
        if(btn.id === "ok"){
            year = Number(calendarYear.value);
        }else{
            year = new Date().getFullYear();
            month = new Date().getMonth();
        }


        calendarShow.style.display = "block";
        calendarHide.style.display = "none";
        renderCalendar();
    })
})


// *Clock
function renderClock(){
    const time = d.toLocaleTimeString();
    clockTime.innerText = time;
}

function renderDate(){
    clockDate.innerText = `${days[day]}, ${months[month]} ${date}, ${year}`;
}
renderDate();
// *Init
function init(){
    d = new Date();
    hour = d.getHours();
    renderClock();

    // *starting a new day will re-render, render only once.
    if(hour === 0 && count === 0){
        day = d.getDay();
        date = d.getDay();
        month = d.getMonth();
        year = d.getFullYear();
        count++;

        renderDate();
        renderCalendar();
    }



    // * after 0h => reset count = 0;
    if(hour > 0 && count > 0){
        count = 0
    };




    setTimeout(init, 1000);
}
init();