/**
 * Employees.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "employees",
  attributes: {
    // primaryKey: "id",

    type: {
      type: "string",
      required: true
    },
    first_name: {
      type: "string",
      required: true
      // size: 100
    },
    last_name: {
      type: "string",
      required: true
      // size: 100
    },
    email: {
      type: "string",
      unique: true,
      required: true
      // size: 100
    },
    meeting_link: {
      type: "string",
      unique: true,
      required: true
      // size: 255
    }
  }
};
