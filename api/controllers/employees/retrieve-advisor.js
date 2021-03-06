/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: "Get employee details",

  description: "Get employee details by email address",

  inputs: {
    id: {
      type: "number",
    },
  },

  exits: {
    invalidOrExpiredToken: {
      responseType: "expired",
      description:
        "The provided token is expired, invalid, or already used up.",
    },
    success: {
      outputDescription: "The newly created `Advisor`.",
      outputExample: {},
    },
  },

  fn: async function () {
    var retrievedEmployee = await Employees.find({
      id: this.req.param("id"),
    });

    if (retrievedEmployee.length == 0) {
      return { message: "No employee with the given input" };
    }

    return { employee: retrievedEmployee };
  },
};
