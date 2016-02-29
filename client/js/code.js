/**
 * Created by RaZr0 on 06/12/2015.|
 * This is the client side.
 *The client connects to the server via io socket.
 * here we have all the logic of the messages.
 * For example :when each message will be presented ,duration of each message,transformation of messages and validation of data.
 */

var messages;
var update;
var counter = 1;
var bool=false;


$(document).ready(function() {
    var socket=io.connect('http://localhost:8080');
    socket.on('data',function(data){
        messages=data;
        advertsToRun(0);
    });



    socket.on('update',function(data){
        update=data;
        bool=true;
    });



});

function setText(textArray){
    for (i = 0; i < textArray.length; i++) {
        $("p#" + i).text(textArray[i])
    }
    for (j = i; j < 10; j++) {
        $("p#" + j).text("")
    }
}

function setPic(picArray){
    for (i = 0; i < picArray.length; i++) {
        $("img#image"+i).attr("src",picArray[i])
    }
    for (j = i; j < 5; j++) {
        $("img#image"+j).attr("src","")
    }
}


/**
 * This function checks to see if the days in the message are valid according to the real day.
 * @param currentDay
 * @param daysToRun
 * @param currentHour
 * @returns {boolean}
 */
function daysMatch(currentDay,daysToRun,currentHour){
    for(i=0;i<daysToRun.length;i++){
        if(daysToRun[i].day==currentDay) {
            if (daysToRun[i].startHour <= currentHour && daysToRun[i].endHour > currentHour)
                return true;
        }
    }
    return false;
}

/**
 * This function is responsible for the running of adverts.
 * @param index
 */
function advertsToRun(index) {

    var currentTime = new Date();
    if (bool == true) {
        messages = update;
        bool=false;
        counter=1;
        index=0;
    }

    if(messages.length==0)
    {
        $("#result").load("empty.html");
        setTimeout (advertsToRun, (60-currentTime.getSeconds())*1000,0);
        return;
    }

    if(validTime(index,messages,currentTime)){

        $("#result").load(messages[index].link,function(){
            setText(messages[index].text);
            setPic(messages[index].picture);
        });

        setTimeout (advertsToRun, messages[index].duration,(index+1)%messages.length);
        counter = 1;
    }
    else {
        if(counter==messages.length){
            setTimeout (advertsToRun, (60-currentTime.getSeconds())*1000,(index+1)%messages.length);
            $("#result").load("empty.html");
            counter = 1;
        }
        else {
            setTimeout (advertsToRun, 0,(index+1)%messages.length);
            counter++;
        }
    }
}
/**
 * This function validates the time of message according to the real time .
 * @param index
 * @param messages
 * @param currentTime
 * @returns {boolean}
 */

function validTime(index,messages,currentTime){



    var startDate=new Date(messages[index].time.startDate);
    var endDate=new Date(messages[index].time.endDate);


    if(startDate<=currentTime && endDate>=currentTime)
        return daysMatch(currentTime.getDay()+1,messages[index].time.hoursByDay,currentTime.getHours());
    else
        return false;
}
