const moment = require("moment");
module.exports = {
  inputs: {
    user: {
      type: "ref",
    },
    advisorId: {
      type: "number",
    },
    appointmentDate: {
      type: "string",
    },
    appointmentStartTime: {
      type: "string",
    },
    appointmentEndTime: {
      type: "string",
    },
  },
  fn: async function (inputs) {
    advisor = await Employees.findOne({
      type: "Advisor",
      id: inputs.advisorId,
    });
    const emailBody = `Your appointment has been confirmed on
    ${moment(inputs.appointmentDate, "YYYY-MM-DD").format("DD MMM YYYY")} ${
      inputs.appointmentStartTime
    }-${inputs.appointmentEndTime}`;
    await sails.helpers.sendEmail.with({
      userEmail: inputs.user.email,
      body: emailBody,
    });

    await sails.helpers.sendEmail.with({
      userEmail: sails.config.adminEmail,
      body: emailBody,
    });

    await sails.helpers.sendEmail.with({
      userEmail: advisor.email,
      body: emailBody,
    });

    const intervals = await sails.helpers.getIntervals(
      inputs.appointmentStartTime,
      inputs.appointmentEndTime
    );

    await sails.helpers.updateSlotsForUser.with({
      user: inputs.user,
      slotsUsed: intervals.length,
    });
  },
};
