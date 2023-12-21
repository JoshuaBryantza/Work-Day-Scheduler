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

$(function () {
  var currentHour = dayjs().hour();
  console.log(currentHour);
  for (var i = 0; i < timeSlot.length; i++) {
    var currentValue = timeSlot[i];

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

    //this section I append the elements 
    timeSlotBtnSaveEl.append(timeSlotBtnSaveIconEl);
    timeSlotsEl.append(timeSlotTextEl).append(timeSlotTextAreaEl).append(timeSlotBtnSaveEl);

    rootEl.append(timeSlotsEl);

    timeSlotBtnSaveEl.on('click', function (event) {
      let key = event.target.dataset.slot;
      let value = $('#hour-' + key)[0].value;

      localStorage.setItem(key, value);
    })
  }

});


function testFunction(input) {
  console.log(input);
  return input[0];
}
