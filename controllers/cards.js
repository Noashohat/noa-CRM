const joi = require("joi");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addNewCard: async function (req, res, next) {
    const reqBody = req.body;

    // function validateUser(user) {
    //   const schema = Joi.object({
    //     name: Joi.string().min(2).max(255).required(),
    //     email: Joi.string().min(6).max(255).required().email(),
    //     password: Joi.string().min(6).max(1024).required(),
    //     biz: Joi.boolean().required(),
    //   });

    const schema = joi.object({
      bizname: joi.string().required().min(2).max(200),
      bizDescription: Joi.string().min(2).max(1024).required(),
      bizAddress: Joi.string().min(2).max(400).required(),
      bizPhone: joi
        .string()
        .required()
        .regex(/^[0-9]{8,11}$/),
      bizImage: joi.string().min(11).max(1024),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding card: ${error}`);
      return;
    }

    // const sql =
    //     "INSERT INTO customers(name, phone, email, country_id)" +
    //     " VALUES(?,?,?,?);";

    try {
      const database = await mongo.getDb();
      const collection = database.collection("cards");
      collection.insertOne(value); // { name: '', phone..., email}
      res.json(value);
    } catch (err) {
      console.log(err);
      res.status(400).send(`error adding card`);
    }
  },

  getCardDetails: async function (req, res, next) {},
  getCustomerCardsDetails: async function (req, res, next) {},
  editCardDetails: async function (req, res, next) {},
  deleteCard: async function (req, res) {},
};
