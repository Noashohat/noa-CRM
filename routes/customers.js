const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");

// router.get("/find", cm.findCustomer);
// // router.get   ('/details', cm.viewCustomerDetails);
// router.get("/export", cm.exportCustomers);
// router.patch ('/', cm.updateCustomer);
router.post("/customers", cm.addCustomer);
// router.delete('/', cm.deleteCustomer);

module.exports = router;
