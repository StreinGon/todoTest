const express = require("express");
const router = express.Router();

const functionForLocalAuth = require("../public/customFunction/functionForLocalAuth");

router.post("/", functionForLocalAuth);

module.exports = router;
