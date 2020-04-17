var moment = require("moment");

var SEVEN = 7;
module.exports = {
  fn: async function () {
    var weekDayVsDate = {};

    for (var i = 1; i <= SEVEN; i++) {
      var next = moment().add(i, "day").format("YYYY-MM-DD");
      var day = moment().add(i, "day").weekday();
      weekDayVsDate[day] = next;
    }

    return weekDayVsDate;
  },
};
