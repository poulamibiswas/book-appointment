/**
 * Calendar.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "appointments",
  attributes: {
    advisor_id: {
      type: "number",
      required: true,
    },
    user_id: {
      type: "number",
      required: true,
    },
    appointment_date: { type: "ref", columnType: "date", required: true },
    appointment_start_time: { type: "ref", columnType: "date", required: true },
    appointment_end_time: { type: "ref", columnType: "date", required: true },
    remarks: {
      type: "string",
    },
  },
};
