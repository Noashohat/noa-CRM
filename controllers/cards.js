const joi = require("joi");
const objectId = require("joi-objectid");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addNewCard: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      businessName: joi.string().required().min(2).max(200),
      businessDescription: Joi.string().min(2).max(1024).required(),
      businessAddress: Joi.string().min(2).max(400).required(),
      businessPhone: joi
        .string()
        .required()
        .regex(/^[0-9]{8,11}$/),
      businessPic: joi.string().min(11).max(1024),
      customerId: Joi.objectId().required(),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding card: ${error}`);
      return;
    }

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

  getCardDetails: async function (req, res, next) {
    //collection.find()
  },
  getCustomerCardsDetails: async function (req, res, next) {
    //collection.find({customerId:value})
  },
  editCardDetails: async function (req, res, next) {},
  deleteCard: async function (req, res) {
    //collection.delete({businessName:value})
  },
};
