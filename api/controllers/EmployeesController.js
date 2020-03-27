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
    first_name: {
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

  fn: async function({ type, first_name }) {
    await Employees.create({ type, first_name });
  },

  listAdvisors: function(req, res) {
    console.log("List !!!");
    var rdi = sails.getDatastore("default");
    console.log("rdi", rdi);
    // var rdi = Employees.getDatastore();
    var mysql = rdi.driver.mysql;
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "localhost123",
      database: "schemaNew_db"
    });
    console.log("Connection ", connection);
    connection
      .query("SELECT * FROM employees")
      .stream({ highWaterMark: 5 })
      .pipe();
  }
};
