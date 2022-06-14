const joi = require("joi");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addNewCard: async function (req, res, next) {
    const reqBody = req.body;
  },

  getCardDetails: async function (req, res, next) {},
  getCustomerCardsDetails: async function (req, res, next) {},
  editCardDetails: async function (req, res, next) {},
  deleteCard: async function (req, res) {},
};
