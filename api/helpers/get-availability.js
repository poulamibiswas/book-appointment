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
    var advisorId = inputs.advisorId;
    var userId = inputs.userId;
    var allSlots = await sails.helpers.getAllSlots.with({
      advisorId: advisorId,
    });

    var futureBookedAppointmentsFor = await sails.helpers.getAppointmentsForUser.with(
      {
        advisorId: advisorId,
        userId: userId,
      }
    );

    if (futureBookedAppointmentsFor.length == 0) {
      return {
        message: `Available Slots for Advisor ${advisorId} and user ${this.req.param(
          "userId"
        )}`,
        advisorId: advisorId,
        userId: userId,
        slots: allSlots,
      };
    }

    var availableSlotsForGivenAdvisor = await sails.helpers.calculateAvailableSlotsPerAdvisor.with(
      {
        totalSlots: allSlots,
        bookedSlots: futureBookedAppointmentsFor,
      }
    );

    return {
      message: `Available Slots for Advisor ${advisorId} and user ${userId}`,
      advisorId: advisorId,
      availableSlotsForGivenAdvisor: availableSlotsForGivenAdvisor,
      userId: userId,
    };
  },
};
