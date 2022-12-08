// JavaScript function that wraps everything
$(document).ready(function () {

    // constants
    const containerEl = $('.container'); // container class div

    const methods = { separate_elements: 1, single_jQuery: 2 };
    const method = methods.single_jQuery;

    // localStorage
    const WORK_DAY_SCHEDULE = 'workDaySchedule';
    const scheduleString = localStorage.getItem(WORK_DAY_SCHEDULE);
    const schedule = JSON.parse(scheduleString) ?? Array(24); // null coalescing operator gives initial array of 24 hour slots

    // clock timer
    $(function () {
        timer = setInterval(function () {
            $('#currentDay').text(moment().format("dddd Do MMMM YYYY h:mm:ss a"));
        }, 1000);
    });

    // create row elements for each working hour #container
    let currentHour = moment().format('HH'); // current hour
    const WORK_DAY_START = 9; // 9am
    const WORK_DAY_END = 17; // 5pm
    for (let hour = WORK_DAY_START; hour <= WORK_DAY_END; hour++) {
        switch (method) {
            case methods.separate_elements:
                let rowDiv = $("<div>").addClass("row time-block");
                let timeEl = $("<p>").addClass("col-1 hour").text(moment(hour, "HH").format("hA"));
                let textareaEl = $("<textarea>").addClass("col-10 description").attr("id", hour).text(schedule[hour - 1]);
                // if (currentHour > hour) { textEl.addClass("past"); }
                // else if (currentHour == hour) { textEl.addClass("present"); }
                // else { textEl.addClass("future"); }
                // if then else is so long winded
                textareaEl.addClass((currentHour > hour) ? "past" : (currentHour == hour) ? "present" : (currentHour < hour) ? "future" : "");
                let saveBtn = $("<button>").addClass("col-1 saveBtn").attr("data-hour", hour).append($("<i>").addClass("fas fa-save"));
                rowDiv.append(timeEl, textareaEl, saveBtn);
                containerEl.append(rowDiv);
                break;
            case methods.single_jQuery:
                // goc - ghost of christmas (reference to Dickens - A Christmas Carol)
                let goc = (currentHour > hour) ? "past" : (currentHour == hour) ? 'present' : (currentHour < hour) ? 'future' : '';
                containerEl.append([
                    $('<div>', { "class": "row time-block" }).append([
                        $('<p>', { "class": "col-1 hour", "text": moment(hour, "HH").format("hA") }),
                        $('<textarea>', { "class": "col-10 description " + goc, "id": hour, "text": schedule[hour - 1] }),
                        $('<button>', { "class": "col-1 saveBtn", "data-hour": hour }).append($('<i>', { "class": "fas fa-save" }))
                    ])
                ])
                break;
        }
    }

    containerEl.on("click", ".saveBtn", function () {
        // get the data-hour attribute from the save button on the row
        let id = $(this).attr("data-hour");
        // use that to find the matching id which gives the textarea
        // and use the val() of that (the user text) to update the schedule array
        schedule[id - 1] = $("#" + id).val();
        // then save in local storage
        localStorage.setItem(WORK_DAY_SCHEDULE, JSON.stringify(schedule));
    });

});
