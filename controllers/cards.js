const joi = require("joi");
const database = require("./database");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addNewCard: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      customer_id: joi
        .string()
        .required()
        .regex(/^(?=.*[a-z])[a-z0-9]{8,20}$/i),
      bizName: joi.string().min(2).max(255).required(),
      bizDescription: joi.string().min(2).max(1024).required(),
      bizAddress: joi.string().min(2).max(400).required(),
      bizPhone: joi
        .string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      bizImage: joi.string().min(11).max(1024),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`error adding card: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO cards( customer_id, bizName, bizDescription,bizAddress,bizPhone,bizImage)" +
      " VALUES(?,?,?,?,?,?);";

    try {
      const result = await database.query(sql, [
        reqBody.customer_id,
        reqBody.bizName,
        reqBody.bizDescription,
        reqBody.bizAddress,
        reqBody.bizPhone,
        reqBody.bizImage,
      ]);
    } catch (err) {
      console.log(err);
      return;
    }

    res.send(`${reqBody.name} added successfully`);
  },

  getCardDetails: async function (req, res, next) {
    //collection.find({id:value})
    const param = req.query;
    ////todo: validate card id!
    const schema = joi.object({
      id: joi.number().required(),
    });
    //     try {
    //       const database = await mongo.getDb();
    //       const collection = database.collection('cards');

    //       const result = await collection
    //           .find({})
    //           .sort({ name: 1 }) // ASC
    //           .toArray();

    //       res.json(result);
    //   }
    //   catch (err) {
    //       console.log(err);
    //       res.status(400).send(err);
    //   }
  },
  getCustomerCardsDetails: async function (req, res, next) {
    //collection.find({customerId:value})
    const param = req.query;
    //todo: validate id of customer
    const schema = joi.object({
      customerId: joi.number().required(),
    });

    //     try {
    //       const database = await mongo.getDb();
    //       const collection = database.collection('cards');

    //       const result = await collection
    //           .find({})
    //           .sort({ name: 1 }) // ASC
    //           .toArray();

    //       res.json(result);
    //   }
    //   catch (err) {
    //       console.log(err);
    //       res.status(400).send(err);
    //   }
  },
  editCardDetails: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      businessName: joi.string().required().min(2).max(200),
      businessDescription: Joi.string().min(2).max(1024).required(),
      businessAddress: Joi.string().min(2).max(400).required(),
      businessPhone: joi
        .string()
        .required()
        .regex(/^(?=.*[a-z])[a-z0-9]{8,20}$/i),
      bizName: joi.string().min(2).max(255).required(),
      bizDescription: joi.string().min(2).max(1024).required(),
      bizAddress: joi.string().min(2).max(400).required(),
      bizPhone: joi
        .string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      bizImage: joi.string().min(11).max(1024),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`error update card: ${error}`);
      return;
    }

    const keys = Object.keys(value);
    const values = Object.values(value);
    const fields = keys.map((key) => `${key}=?`).join(",");

    const sql = `UPDATE cards SET ${fields} WHERE id=?`;

    try {
      const result = await database.query(sql, values);
      res.json(value);
    } catch (err) {
      console.log(err);
      return;
    }
  },

  deleteCard: async function (req, res) {
    const schema = joi.object({
      id: joi.number.required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      res.status(400).send("error delete card");
      console.log(error);
      return;
    }

    const sql = `DELETE FROM cards WHERE id=?`;

    try {
      const result = await database.query(sql, [value.id]);
      res.json(result[0]);
    } catch (err) {
      res.status(400).send("error delete card");
      console.log(err.message);
    }
  },
};
