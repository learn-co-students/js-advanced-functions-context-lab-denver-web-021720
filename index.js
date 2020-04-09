/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord(infoArray) {
    return {
        firstName: infoArray[0], 
        familyName: infoArray[1], 
        title: infoArray[2], 
        payPerHour: infoArray[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(person => createEmployeeRecord(person));
}

let createTimeInEvent = function(stamp) {
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(stamp.split(" ")[1]), 
        date: stamp.split(" ")[0]});
    return this;
}

let createTimeOutEvent = function(stamp) {
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(stamp.split(" ")[1]), 
        date: stamp.split(" ")[0]});
    return this;
}

let hoursWorkedOnDate = function(date) {
    let timeOut = this.timeOutEvents.find(timeStamp => timeStamp.date == date).hour;
    let timeIn = this.timeInEvents.find(timeStamp => timeStamp.date == date).hour;
    return (timeOut - timeIn) / 100;
}


let wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(records, name) {
    return records.find(employee => employee.firstName == name);
}

let calculatePayroll = function(records) {
    return records.map(employee => allWagesFor.call(employee)).reduce((total, amount) => total + amount);
}
