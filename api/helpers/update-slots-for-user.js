module.exports = {
  inputs: {
    user: {
      type: "ref",
    },
    slotsUsed: {
      type: "number",
    },
  },

  fn: async function (inputs) {
    const availableSlots = inputs.user.available_free_slots;
    const response = await Users.update({ id: inputs.user.id }).set({
      available_free_slots: availableSlots - inputs.slotsUsed,
    });

    return response;
  },
};
