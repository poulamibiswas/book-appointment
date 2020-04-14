/**
 * Employees.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "calendar",
  attributes: {
    advisor_id: {
      type: "number",
      required: true,
    },
    day: {
      type: "string",
      required: true,
    },
    start_time: {
      type: "string",
      required: true,
    },
    end_time: {
      type: "string",
      unique: true,
      required: true,
    }
  },
};
