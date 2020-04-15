/**
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var _ = require("lodash");

var week = [];
week["SUNDAY"] = 0;
week["MONDAY"] = 1;
week["TUESDAY"] = 2;
week["WEDNESDAY"] = 3;
week["THURSDAY"] = 4;
week["FRIDAY"] = 5;
week["SATURDAY"] = 6;

module.exports = {
  friendlyName: "Add availability for new advisor",

  description:
    "Add availability for new advisor for eg Advisor 1 is available on all Thursdays 3 to 5 pm",

  inputs: {
    advisorId: {
      type: "number",
    },
    day: {
      type: "string",
    },
    startTime: {
      type: "string",
    },
    endTime: {
      type: "string",
    },
  },

  exits: {
    invalidOrExpiredToken: {
      responseType: "expired",
      description:
        "The provided token is expired, invalid, or already used up.",
    },
    success: {
      outputDescription: "Availability updated",
      outputExample: {},
    },
  },

  fn: async function (inputs) {
    var advisorId = this.req.param("id");
    var done = await Calendar.create({
      advisor_id: advisorId,
      day: week[_.upperCase(inputs.day)],
      start_time: inputs.startTime,
      end_time: inputs.endTime,
      meeting_link: inputs.meetingLink,
    }).fetch();
    if (done.id > 0) {
      return {
        id: done.id,
        message: "Calendar for advisor updated successfully",
      };
    }
  },
};
