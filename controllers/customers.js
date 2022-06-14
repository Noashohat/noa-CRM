const joi = require("joi");
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

  customersList: async function (req, res, next) {
    const param = req.query; // get method
    //  const param = req.body;  // post method

    // // const schema = joi.object({
    // //     column: joi.string().valid('name', 'email', 'country_name').default('name'),
    // //     sort: joi.string().valid('ASC', 'DESC').default('ASC'),
    // // });

    // // const { error, value } = schema.validate(param);

    // // const fieldsMap = new Map([
    // //     ['name', 'customers.name'],
    // //     ['email', 'customers.email'],
    // //     ['country_name', 'countries.name'],
    // // ]);

    // const sql = `SELECT customers.id, customers.name, customers.phone, customers.email,
    //     countries.id AS country_id, countries.name AS country_name, countries.country_code
    //     FROM customers LEFT JOIN countries ON customers.country_id = countries.id
    // ORDER BY ${fieldsMap.get(value.column)} ${value.sort};`;

    try {
      const database = await mongo.getDb();
      const collection = database.collection("customers");

      const result = await collection
        .find({})
        .sort({ name: 1 }) // ASC
        .toArray();

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getCustomerDetails: async function (req, res, next) {},
};
