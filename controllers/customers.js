const joi = require("joi");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");
const bcrypt = require("bcrypt");

module.exports = {
  // register: async function (req, res, next) {
  //   let username = req.body.username;
  //   let password = req.body.password;
  //   res.send(`Username: ${username} Password: ${password}`);
  // },

  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      id: joi
        .number()
        .required()
        .regex(/^(?=.*[a-z])[a-z0-9]{8,20}$/i),
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
    });
    // .keys({
    //   type: joi.string().valid("business", "individual"),
    // });
    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`error adding customer: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO customers(id,name,phone,email,password,type)" +
      " VALUES(?,?,?,?,?,?);";

    try {
      const result = await database.query(sql, [
        reqBody.id,
        reqBody.name,
        reqBody.phone,
        reqBody.email,
        reqBody.password,
        reqBody.type,
      ]);

      const value = [
        reqBody.id,
        reqBody.name,
        reqBody.phone,
        reqBody.email,
        reqBody.password,
        reqBody.type,
      ];
    } catch (err) {
      console.log(err);
      return;
    }

    // const validPassword = await bcrypt.compare(
    //   reqBody.password,
    //   rows[0].password_hash
    // );

    res.status(200).send.json(`${value} added successfully`);
  },
};
