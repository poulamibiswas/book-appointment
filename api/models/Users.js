module.exports = {
  tableName: "users",
  attributes: {
    email: {
      type: "string",
      required: true,
    },
    allowed_free_slots: {
      type: "number",
      required: true,
    },
    available_free_slots: {
      type: "number",
      required: true,
    },
  },
};
