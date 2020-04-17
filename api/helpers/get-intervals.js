var moment = require("moment");
var _ = require("lodash");

var SLOT_DURATION_IN_MINS = 15;

module.exports = {
  inputs: {
    startString: {
      type: "string",
    },
    endString: {
      type: "string",
    },
  },
  fn: async function (inputs) {
    var start = moment(inputs.startString, "hh:mm a");
    var end = moment(inputs.endString, "hh:mm a");

    start.minutes(
      Math.ceil(start.minutes() / SLOT_DURATION_IN_MINS) * SLOT_DURATION_IN_MINS
    );

    var result = [];

    var current = moment(start);

    while (current < end) {
      result.push(current.format("HH:mm"));
      current.add(15, "minutes");
    }

    return result;
  },
};
