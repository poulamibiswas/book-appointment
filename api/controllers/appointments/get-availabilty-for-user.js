/**
 ** Redundant can be used incase for fetching availabilty for one advisor
 */
module.exports = {
  friendlyName: "Get available slots for 1 user and 1 advisor",

  inputs: {
    userId: {
      type: "number",
    },
  },

  fn: async function () {
    var advisorId = this.req.param("advisorId");
    var userId = this.req.param("userId");
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
      userId: this.req.param("userId"),
    };
  },
};
