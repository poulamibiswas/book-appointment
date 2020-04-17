module.exports = {
  inputs: {
    advisorId: {
      type: "number",
    },
  },

  fn: async function (inputs) {
    var allSlots = await Calendar.find({
      advisor_id: inputs.advisorId,
    });

    var dayBySlots = await sails.helpers.getSlotsByWeekday.with({
      allSlots: allSlots,
    });

    return dayBySlots;
  },
};
