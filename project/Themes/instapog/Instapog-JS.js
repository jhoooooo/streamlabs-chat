// Code in Jquery cause SLOBS already added those in so why not, make the smoothscroll animation easier to do. I'm not a dev/ haven't even finish learning js on my own so idk what i'm doing most of the time lol.
// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
    // obj will be empty for chat widget
    // this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
    // obj will contain information about the event
    console.log(obj.detail); // OBJ Logs - all message logged here.

    const smoothscroll = {smoothscroll}; //variable hooked to SLOBS custom fields. all {example} is custom fields option automaticly populated by SLOBS. ${example} is normal JS code.

    if (obj.detail.command === "PRIVMSG") { // detect chat messages, exclude twitch notices.

        //smoothscroll
        if (smoothscroll == true) {
            $('#log>div').last().hide().slideToggle(600, "easeInOutQuart"); //jquery animation code
        }

        // Heart bomb animation
        function bomb(){
            // On event received - Heart animation
            var randomNumber = function(max, min) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }; // random number generator
            var bottom = 20; //popup start location
            var left = 80; //popup start location
            var size = randomNumber(15, 40); //heart size
            var heartsId = randomNumber(100, 50000); //heart ID so removing once done easier
            let defaultImage = "";
            const animationType = ["curve_ani", "curve_ani2", "curve_ani3", "curve_ani4", "curve_ani5", "curve_ani6"];
            let choosenAnimation = Math.floor(Math.random() * 6);
            let heartsAni = animationType[choosenAnimation]; 
            let defaultColor = '{heart_default_color}';
            let subscriberColor = '{heart_subscriber_color}';

            if (obj.detail.tags.subscriber == "1" ){ //detect if mod/streamer. "obj.detail.
                $("#custom_html").append('<span class="hearts' + ` hearts-${heartsId}` + ` ${heartsAni}"` + 'style="position: absolute; bottom:' + bottom + 'px; left:' + left + '%;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" width="' + size + '" fill="' + subscriberColor + '"><path d="M9.293 1.55l.707.708.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0L2.222 8.622a5 5 0 1 1 7.07-7.071z"></path></svg></span>'); //append heart to chat container
                setTimeout(function () { $(`.hearts-${heartsId}`).remove(); }, 3000);
            }
            else {
                $("#custom_html").append('<span class="hearts' + ` hearts-${heartsId}` + ` ${heartsAni}"` + 'style="position: absolute; bottom:' + bottom + 'px; left:' + left + '%;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" width="' + size + '" fill="' + defaultColor + '"><path d="M9.293 1.55l.707.708.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0L2.222 8.622a5 5 0 1 1 7.07-7.071z"></path></svg></span>'); //append heart to chat container
            setTimeout(function () { $(`.hearts-${heartsId}`).remove(); }, 3000);
            }
        }

        //normal message heart animation
        var randomNumber = function(max, min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        let delayRandom = randomNumber(90, 150); 
        let heartCount = 5;
        (function delayBomb(i) { //function to ensure loop/multiple popup don't stack.
            setTimeout(function() {
            bomb(); //calling the heart popup function once each loop.
            if (--i) delayBomb(i);
            }, delayRandom) //delay
        })(heartCount);

        //heart bomb animation
        const messageBody = obj.detail.body; //message body
        let triggerWord = "{trigger}"; //custom field parameter. put text input there so easy for user to update.
        let bombCount = {bombCount}; //heart count from SLOBS custom fields
        if (obj.detail.tags.mod == "1" || obj.detail.owner == "1" ){ //detect if mod/streamer. "obj.detail.tags.subscriber" for sub)
            if(messageBody.includes(triggerWord)){
                (function delayBomb(i) { //function to ensure loop/multiple popup don't stack.
                    setTimeout(function() {
                    bomb(); //calling the heart popup function once each loop.
                    if (--i) delayBomb(i);
                    }, 100) //delay
                })(bombCount);  //no of loop (hearts popup)/100 will call 100 animation making it a 'bomb'.
            }
        }
    }
    // Limit message shown
    const limitEnable = {enable_limit}; //enable limit number of message shown
    const msgLimit = {message_limit}; //number of message shown if limit enabled
    const msgParent = document.querySelector('.sl__chat__layout'); //container

    if (limitEnable == true) {
        if (msgParent.children.length > msgLimit) {
            $('#log>div').not($('#log>div').slice(-msgLimit)).fadeOut(); //slice out message after limit reached
        }
    }
    // clear whole chat but not "/timeout" & "/ban" cause "/clear" don't have obj.detail.body tag. and SLOBS handled those already.
    if (obj.detail.command === "CLEARCHAT" && typeof obj.detail.body === "undefined") {
        $('#log').empty(); //emptying the chat.
    }
});