module.exports = {
  inputs: {
    user: {
      type: "ref",
    },
  },

  fn: async function (inputs) {
    const availableSlots = inputs.user.available_free_slots;
    const response = await Users.update({ id: inputs.user.id }).set({
      available_free_slots: availableSlots - 1,
    });

    return response;
  },
};
