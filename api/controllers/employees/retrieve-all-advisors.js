/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: "Get all advisors",

  description: "Get all advisors",

  // inputs: {
  //   id: {
  //     type: "number"
  //   }
  // },

  exits: {
    invalidOrExpiredToken: {
      responseType: "expired",
      description: "The provided token is expired, invalid, or already used up."
    },
    success: {
      outputDescription: "The newly created `Advisor`.",
      outputExample: {}
    }
  },

  fn: async function() {
    var retrievedEmployees = await Employees.find({
      type: "Advisor"
    });

    if (retrievedEmployees.length == 0) {
      return { message: "No employee with the given input" };
    }

    return { employees: retrievedEmployees };
  }
};
