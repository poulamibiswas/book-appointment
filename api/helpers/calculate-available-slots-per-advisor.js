var _ = require("lodash");

module.exports = {
  inputs: {
    totalSlots: {
      type: "ref",
    },
    bookedSlots: {
      type: "ref",
    },
  },
  fn: async function (inputs) {
    var availableSlots = {};
    var nextSevenDays = await sails.helpers.getNextSevenDays();
    for (var key in nextSevenDays) {
      var day = key;
      var date = nextSevenDays[key];

      var slotsForGivenDay = inputs.totalSlots[day];
      var bookedSlotsForGivenDate = inputs.bookedSlots[date];
      if (slotsForGivenDay) {
        if (bookedSlotsForGivenDate != undefined) {
          for (var i = 0; i < bookedSlotsForGivenDate.length; i++) {
            var bookedSlotsIntervals = [];
            var intervals = await sails.helpers.getIntervals.with({
              startString: bookedSlotsForGivenDate[i].appointment_start_time,
              endString: bookedSlotsForGivenDate[i].appointment_end_time,
            });
            bookedSlotsIntervals = bookedSlotsIntervals.concat(intervals);
            var availableSlotsForGivenDate = _.difference(
              slotsForGivenDay,
              bookedSlotsIntervals
            );
          }
          availableSlots[date] = availableSlotsForGivenDate;
        } else {
          availableSlots[date] = slotsForGivenDay;
        }
      }
    }
    return availableSlots;
  },
};
