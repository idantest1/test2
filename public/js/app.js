function asterixModule() {
    var callBegin, time, hours, minutes, seconds;
    var timersOfEmployees = [{ name: "Test", timer: null }, { name: "Simon", timer: null }, { name: "Graziano", timer: null }];

    function insertTimerOfEmployee(employeeName, timer) {

        for (var i = 0; i < timersOfEmployees.length; i++) {
            if (timersOfEmployees[i].name === employeeName) {
                return timersOfEmployees[i].timer = timer;
            }
        }
    }

    function getTimerOfEmployee(employeeName) {

        for (var i = 0; i < timersOfEmployees.length; i++) {
            if (timersOfEmployees[i].name === employeeName) {
                return timersOfEmployees[i].timer;
            }
        }
    }

    function getTimerValue(startTime) {
        callBegin = startTime.getTime() / 1000;
        time = new Date().getTime() / 1000 - callBegin;
        hours = Math.floor(time / 3600);
        minutes = Math.floor((time - hours) / 60);
        seconds = Math.floor(time - (minutes * 60) - (hours * 3600));
        return str_pad_left(hours) + ":" + str_pad_left(minutes) + ":" + str_pad_left(seconds);
    }

    function str_pad_left(timePart) {
        if (timePart < 10) {
            return '0' + timePart;
        } else {
            return timePart;
        }
    }

    return {
        getTimerValue: getTimerValue,
        getTimerOfEmployee: getTimerOfEmployee,
        insertTimerOfEmployee: insertTimerOfEmployee
    };
}

var asterix = asterixModule();
var socket = io();
socket.on('dial', function (data) {
    if (data.subevent === "Begin") {
        console.log(data);
    }
});

socket.on('hangup', function (data) {
    console.log(data);
});

