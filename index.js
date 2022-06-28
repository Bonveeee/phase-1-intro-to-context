// Your code here
//creates employees record
function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}


function createEmployeeRecords(arrayRecord) {
    let employeeRecords = arrayRecord.map((record) => createEmployeeRecord(record));
    return employeeRecords;

}

//creates timein
function createTimeInEvent(empRecordObj, dateStamp) {

    let [date, hour] = dateStamp.split(" ");

    empRecordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return empRecordObj;
}


// creates time out
function createTimeOutEvent(empRecordObj, dateStamp){
    let [date, hour] = dateStamp.split(" ");

    empRecordObj.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return empRecordObj;
  }


function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event =>
        event.date == date)
    let timeOut = employee.timeOutEvents.find(event =>
        event.date == date)
    let totalTime = (timeOut.hour - timeIn.hour) / 100
    return totalTime;
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date)
    }, 0)
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}