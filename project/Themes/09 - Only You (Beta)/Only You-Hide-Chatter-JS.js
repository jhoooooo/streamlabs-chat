// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
    // obj will be empty for chat widget
    // this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
    // obj will contain information about the event
  	console.log(obj.detail); // OBJ Logs
    const botNames = ["nightbot","moobot","xanbot","deepbot","vivbot","phantombot","streamelements"];
    const specialList = '{special_list}';
    const specialNames = specialList.split(' ');
    const smoothscroll = {smoothscroll};
    const limitEnable = {limit_enabler};
    const msgLimit = {message_limiter};
    const msgParent = document.querySelector('.sl__chat__layout');

    if (obj.detail.command === "PRIVMSG") {
        let isCommand = obj.detail.body.charAt(0);
        if (botNames.indexOf(obj.detail.from) == -1 && isCommand != "!"){
            if (smoothscroll == true) {
                $('#log>div').last().hide().slideToggle(600, "easeInOutQuart");
            }
            if (obj.detail.owner == "1") {
                $(".message-box").last().addClass("owner");
            }
            if (obj.detail.tags.mod == "1")
            {
                $(".message-box").last().addClass("moderator");
            }
            if (obj.detail.tags.subscriber == "1")
            {
                $(".message-box").last().addClass("subscriber");
            }
            if (specialNames.indexOf(obj.detail.from) !== -1) {
                $(".message-box").last().addClass("special");
            }
        }
        if (limitEnable == true) {
            if (msgParent.children.length > msgLimit) {
                $('#log>div').not($('#log>div').slice(-msgLimit)).fadeOut();
            }
        }
    }
    if (obj.detail.command === "CLEARCHAT") {
        $('#log').empty();
    }
});
