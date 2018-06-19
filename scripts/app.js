//1)need to get the time starting NOW (the point that the timer starts)
    //normalize the input
    //keep track of the timer
//2)also get the timestamp that the timer will end
    //decrement the timer from its starting point
//3) display the timer and the endpoint to the HTML
let countDown;


//handle the tracking of desired time
//all inputs will be converted to seconds before being passed in, if not already done
function timer(seconds) {
   //get the time right NOW
   const now = Date.now(); //this is in millisecond**
   const endPoint = now + (seconds * 1000); 
    console.log( seconds ); //display the initial amount of time immediately
    //decrease the timer every second
    countDown = setInterval( () => {
        //we need to get a new date.now to decrement our timer
        const secondsRemaining = Math.round( (endPoint - Date.now()) / 1000 );
        //stop the countdown if the timer goes past 0
        if ( secondsRemaining < 0 ) {
            clearInterval(countDown);
            return;
        } else {
            console.log(secondsRemaining);
        }
    }, 1000); //end interval
}