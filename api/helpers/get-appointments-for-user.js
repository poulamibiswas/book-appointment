var moment = require("moment");
var _ = require("lodash");
module.exports = {
  inputs: {
    userId: {
      type: "number",
    },
    advisorId: {
      type: "number",
    },
  },
  fn: async function (inputs) {
    var appointmentsForUser = await Appointments.find().where({
      user_id: inputs.userId,
      advisor_id: inputs.advisorId,
    });

    var futureAppointmentsForUser = _.filter(appointmentsForUser, function (
      app
    ) {
      return app.appointment_date > moment().format("YYYY-MM-DD");
    });
    var futureAppointmentsForUserByDate = _.groupBy(
      futureAppointmentsForUser,
      "appointment_date"
    );

    return futureAppointmentsForUserByDate;
  },
};
