(function(){

let countDown;
const timerDisplay = document.querySelector('.timer');
const endTimeDisplay = document.querySelector('.end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('.custom-form');

//all inputs will be converted to seconds before being passed in, if not already done
function timer(seconds) {
    clearInterval(countDown); //clear any active timers

   //get the time right NOW
   const now = Date.now(); //this is in millisecond**
   const endPoint = now + (seconds * 1000); 
   displayTimer(seconds); //display the initial timer immediately
   displayEndTime(endPoint); //display when the timer expires
    //decrease the timer every second
    countDown = setInterval( () => {
        //we need to get a new date.now to decrement our timer
        const secondsRemaining = Math.round( (endPoint - Date.now()) / 1000 );
        //stop the countdown if the timer goes past 0
        if ( secondsRemaining < 0 ) {
            clearInterval(countDown);
            return;
        } else {
            displayTimer(secondsRemaining);
        }
    }, 1000); //end interval
}


//param should always be coming in as seconds
function displayTimer(seconds){   
    const minutes = Math.floor(seconds / 60 );
    const secondsLeft = seconds % 60;
    const display = `${minutes}:${secondsLeft < 10 ? 0 : ''}${secondsLeft}`;
    timerDisplay.textContent = display; //show the timer in the DOM
    document.title = display;
}

//this will use the 'endpoint' variable from the timer function
    //this variable is a result of date.now(), so it will be in milliseconds
function displayEndTime(timeStamp){
    //get a new date to show the user when their timer expires
    const endTime = new Date(timeStamp); //now we have a date object represented by the 'endpoint' variable
    const hour = endTime.getHours();
    const minutes = endTime.getMinutes();
    //adjust the hour and minutes
    endTimeDisplay.textContent = `Timer expires at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? 0 : ''}${minutes}`;
}

//get the time in seconds from the button clicks
function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
//let the user input custom time using the form input
    //the input will initially be in MINUTES
form.addEventListener('submit', function(e){
    e.preventDefault();
   const input = parseInt(this.querySelector('[name=time-input]').value);

   if (Number.isNaN(input)) {
    alert('Please enter number only!');
   } else {
    const seconds = input * 60;
    timer(seconds);
   }
   this.reset(); //clear the form
});

//show about section
const showBtn = document.querySelector('.about');
const hideBtn = document.querySelector('.btn');

showBtn.addEventListener('click', () => {
    document.body.classList.add('show');
});

hideBtn.addEventListener('click', () => {
    document.body.classList.remove('show');
});

})()

