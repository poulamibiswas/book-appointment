module.exports = {
  inputs: {
    allSlots: {
      type: "ref",
    },
  },
  fn: async function (inputs) {
    var dayBySlots = {};
    var slots = inputs.allSlots;
    for (var i = 0; i < slots.length; i++) {
      var startTime = slots[i].start_time;
      var endTime = slots[i].end_time;
      var intervals = await sails.helpers.getIntervals(startTime, endTime);
      if (dayBySlots[slots[i].day] == undefined) {
        dayBySlots[slots[i].day] = intervals;
      } else {
        var temp = dayBySlots[slots[i].day];
        var combined = temp.concat(intervals);
        dayBySlots[slots[i].day] = combined;
      }
    }

    return dayBySlots;
  },
};
