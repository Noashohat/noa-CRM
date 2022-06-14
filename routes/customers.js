const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");
const fileMgmt = require("../shared/fileMgmt");
// const bcrypt = require("bcrypt");

// // http://localhost:3000/customers

// router.get("/home", function (req, res, next) {
//   const filePath = fileMgmt.getHtmlFilePath("customers-home.html");
//   res.sendFile(filePath);
// });

// router.patch ('/', cm.updateCustomer);
router.post("/customers", cm.addCustomer);
// router.delete('/', cm.deleteCustomer);

router.get("/details", cm.getCustomerDetails);
module.exports = router;
