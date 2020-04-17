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
    type: {
      type: "string"
    },
    firstName: {
      type: "string"
    },
    lastName: {
      type: "string"
    },
    email: {
      type: "string"
    },
    meetingLink: {
      type: "string"
    }
  },

  exits: {
    invalidOrExpiredToken: {
      responseType: "expired",
      description:
        "The provided token is expired, invalid, or already used up."
    },
    success: {
      outputDescription: "The newly created `Advisor`.",
      outputExample: {}
    }
  },

  fn: async function(inputs) {
    var done = await Employees.create({
      type: inputs.type,
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      email: inputs.email,
      meeting_link: inputs.meetingLink
    }).fetch();
    if (done.id > 0) {
      return { id: done.id, message: "Advisor created successfully" };
    }
  }
};
