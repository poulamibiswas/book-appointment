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
    appointmentStartTime: {
      type: "string",
    },
    appointmentEndTime: {
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
    var users = await Users.find({
      id: inputs.userId,
    });

    const user = _.first(users);
    if (user.allowed_free_slots === 0 || user.available_free_slots === 0) {
      return { err_message: "No free slots available" };
    }
    var done = await Appointments.create({
      advisor_id: inputs.advisorId,
      user_id: userId,
      appointment_date: inputs.appointmentDate,
      appointment_start_time: inputs.appointmentStartTime,
      appointment_end_time: inputs.appointmentEndTime,
      remarks: inputs.remarks,
    }).fetch();
    if (done.id > 0) {
      await sails.helpers.sendEmail.with({
        user: user,
      });
      await sails.helpers.updateSlotsForUser.with({ user: user });
      return {
        id: done.id,
        message: `Booked appointment for ${userId} successfully`,
      };
    }
  },
};
