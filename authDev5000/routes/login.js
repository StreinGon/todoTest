const express = require("express");
const router = express.Router();
const strats = require("../public/LocalAndJWT");
router.post("/", strats.Local);
module.exports = router;
