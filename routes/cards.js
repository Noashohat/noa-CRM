// const schema = Joi.object({
//     bizName: Joi.string().min(2).max(255).required(),
//     bizDescription: Joi.string().min(2).max(1024).required(),
//     bizAddress: Joi.string().min(2).max(400).required(),
//     bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
//     bizImage: Joi.string().min(11).max(1024)

const express = require("express");
const router = express.Router();
const cm = require("../controllers/cards");

router.post("/cards", cm.addNewCard);
// router.get("/cards", cm.getCardDetails);
// router.get("/cards", cm.getCustomerCardsDetails);
router.put("/cards", cm.editCardDetails);
// router.delete("/cards", cm.deleteCard);
