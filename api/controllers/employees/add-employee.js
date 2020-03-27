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
      type: "string",
      description: "A (very) brief description of the item."
    },
    firstName: {
      type: "string",
      description: "A (very) brief description of the item."
    },
    lastName: {
      type: "string",
      description: "A (very) brief description of the item."
    },
    email: {
      type: "string",
      description: "A (very) brief description of the item."
    },
    meetingLink: {
      type: "string",
      description: "A (very) brief description of the item."
    }
  },

  exits: {
    success: {
      outputDescription: "The newly created `Advisor`.",
      outputExample: {}
    }
  },

  fn: async function(inputs) {
    console.log("hello I am here!!!", inputs);

    var done = await Employees.create({
      type: inputs.type,
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      email: inputs.email,
      meeting_link: inputs.meetingLink
    }).fetch();
    console.log("Status ==>", done);
    return { status: done };
  }
};
