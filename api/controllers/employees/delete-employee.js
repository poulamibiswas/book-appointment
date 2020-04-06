/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: "Add a new Advisor",

  description: "Add a new advisor to the existing list of advisors",

  inputs: {
    email: {
      type: "string"
    }
  },

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
    var emailToBeDeleted = this.req.param("email");
    var deletedEmployee = await Employees.destroy({
      email: emailToBeDeleted
    }).fetch();

    console.log("Deleteed employee", deletedEmployee);
    if (deletedEmployee.length == 0) {
      return { message: "No employee with the given email" };
    }

    return {
      message: `Employee with email ${emailToBeDeleted} has been deleted`
    };
  }
};
