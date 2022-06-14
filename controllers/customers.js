const joi = require("joi");
const objectId = require("joi-objectid");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");
const bcrypt = require("bcrypt");

module.exports = {
  login: async function (req, res, next) {},
  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    // function validateUser(user) {
    //   const schema = Joi.object({
    //     name: Joi.string().min(2).max(255).required(),
    //     email: Joi.string().min(6).max(255).required().email(),
    //     password: Joi.string().min(6).max(1024).required(),
    //     biz: Joi.boolean().required(),
    //   });

    const schema = joi.object({
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

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding customer: ${error}`);
      return;
    }

    // const sql =
    //     "INSERT INTO customers(name, phone, email, country_id)" +
    //     " VALUES(?,?,?,?);";

    try {
      const database = await mongo.getDb();
      const collection = database.collection("customers");
      collection.insertOne(value); // { name: '', phone..., email}
      res.json(value);
    } catch (err) {
      console.log(err);
      res.status(400).send(`error adding customer`);
    }
  },

  getCustomerDetails: async function (req, res, next) {
    //collection.find()
  },
};
