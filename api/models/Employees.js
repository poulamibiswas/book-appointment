/**
 * Employees.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "employees",
  attributes: {
    type: {
      type: "string",
      required: true
    },
    first_name: {
      type: "string",
      required: true
    },
    last_name: {
      type: "string",
      required: true
    },
    email: {
      type: "string",
      unique: true,
      required: true
    },
    meeting_link: {
      type: "string",
      unique: true,
      required: true
      // size: 255
    }
  }
};
