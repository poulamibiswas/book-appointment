var _ = require("lodash");
module.exports = {
  fn: async function () {
    var advisorId = this.req.param("advisorId");
    var userId = this.req.param("userId");
    var availablity = [];
    var allAdvisors;
    if (advisorId == undefined) {
      allAdvisors = await Employees.find({
        type: "Advisor",
      });

      availablity = await Promise.all(
        _.map(allAdvisors, async function (advisor) {
          var response = await sails.helpers.getAvailability.with({
            userId: userId,
            advisorId: advisor.id,
          });

          return response;
        })
      );
    } else {
      availablity = await sails.helpers.getAvailability.with({
        userId: userId,
        advisorId: advisorId,
      });
    }

    return {
      availablity: availablity,
      status: 200,
    };
  },
};
