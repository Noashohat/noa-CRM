const express = require("express");
const router = express.Router();
const cm = require("../controllers/cards");

router.post("/cards", cm.addNewCard);
router.get("/cards/:id", cm.getCardDetails);
// router.get("/cards/:id", cm.getCustomerCardsDetails);
router.put("/cards:id", cm.editCardDetails);
router.delete("/:id", cm.deleteCard);

module.exports = router;
