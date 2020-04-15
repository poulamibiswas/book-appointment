/**
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
/* 
** example payload
{
	"advisorId": 22,
	"appointmentDate": "201-01-01", 
	"appointmentTime":"8:10",
	"remarks": "some random remark"
}
 */
module.exports = {
  friendlyName: "Add appointment",

  description: "Add appointment to the given advisor's calendar",

  inputs: {
    advisorId: {
      type: "number",
    },
    appointmentDate: {
      type: "string",
    },
    appointmentTime: {
      type: "string",
    },
    remarks: {
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
    var userId = this.req.param("userId");
    var done = await Appointments.create({
      advisor_id: inputs.advisorId,
      user_id: userId,
      appointment_date: inputs.appointmentDate,
      appointment_time: inputs.appointmentTime,
      remarks: inputs.remarks,
    }).fetch();
    if (done.id > 0) {
      return {
        id: done.id,
        message: `Booked appointment for ${userId} successfully`,
      };
    }
  },
};