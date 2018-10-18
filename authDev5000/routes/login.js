const express = require("express");
const router = express.Router();

const middlewareForLocalAuth = require("../public/middleware/middlewareForLocalAuth");

router.post("/", middlewareForLocalAuth);

module.exports = router;
