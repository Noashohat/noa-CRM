const joi = require("joi");
const objectId = require("joi-objectid");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");
const bcrypt = require("bcrypt");

module.exports = {
  login: async function (req, res, next) {},
  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi
      .object({
        name: joi.string().required().min(2).max(200),
        phone: joi
          .string()
          .required()
          .regex(/^[0-9]{8,11}$/),
        email: joi
          .string()
          .required()
          .regex(/^[^@]+@[^@]+$/),
        password: joi.string().min(6).max(1024).required(),
      })
      .keys({
        type: Joi.string().valid("business", "individual"),
      });
    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding customer: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO customers(name, phone, email, password,type)" +
      " VALUES(?,?,?,?,?);";

    try {
      const result = await database.query(sql, [
        reqBody.name,
        reqBody.phone,
        reqBody.email,
        reqBody.password,
        reqBody.type,
      ]);
    } catch (err) {
      console.log(err);
      return;
    }

    res.send(`${reqBody.name} added successfully`);
  },
};
