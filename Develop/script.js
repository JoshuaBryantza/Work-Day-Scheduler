var rootEl = $('#root');
var timeSlot = [
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
];
function timeDisplayHandler() {
  const currentDate = dayjs();
  $("#currentDay").text(currentDate);
}

$(function () {
  setInterval(timeDisplayHandler, 1000)

  var currentHour = dayjs().hour();

  //create a loop to iterate over the time-slot array
  for (var i = 0; i < timeSlot.length; i++) {
    var currentValue = timeSlot[i];

    const textValue = localStorage.getItem(currentValue);

    //dynamically set the class
    var timeSlotClass = 'present';

    if (currentValue < currentHour) {
      timeSlotClass = 'past';
    } else if (currentValue > currentHour) {
      timeSlotClass = 'future';
    }

    //this section creates the div, textarea, and button 
    var timeSlotsEl = $('<div>');
    var timeSlotTextEl = $('<div>');
    var timeSlotTextAreaEl = $('<textarea>');
    var timeSlotBtnSaveEl = $('<button>');
    var timeSlotBtnSaveIconEl = $('<i>');

    timeSlotTextEl.text(currentValue);

    timeSlotsEl.addClass('row time-block ' + timeSlotClass);
    timeSlotTextEl.addClass('col-2 col-md-1 hour text-center py-3');
    timeSlotTextAreaEl.addClass('col-8 col-md-10 description').attr('id', 'hour-' + currentValue);
    timeSlotBtnSaveEl.addClass('btn saveBtn col-2 col-md-1').attr({
      'id': 'btn-' + currentValue,
      'aria-label': 'save',
      'data-slot': currentValue
    });
    timeSlotBtnSaveIconEl.addClass("fas fa-save");

    if (textValue != null) {
      timeSlotTextAreaEl.val(textValue);
    }

    //this section I append the elements 
    timeSlotBtnSaveEl.append(timeSlotBtnSaveIconEl);
    timeSlotsEl.append(timeSlotTextEl).append(timeSlotTextAreaEl).append(timeSlotBtnSaveEl);

    rootEl.append(timeSlotsEl);

    timeSlotBtnSaveEl.on('click',
      function (event) {
        let key = event.target.dataset.slot;
        let value = $('#hour-' + key)[0].value;

        localStorage.setItem(key, value);
      }
    )
  }

});

