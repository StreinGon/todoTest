const express = require("express");
const router = express.Router();

const functionForNewUser = require("../controllers/auth/functionForNewUser");
const validator = require("../helpers/validators/validatorForRegistration");
/**
 * @api {get} /todos List all todo
 * @apiGroup Todos
 * @apiSuccessExample {json} Success
 *    200 Registration successfull
 *    {
 *      "msg": "Registration succesfull"
 *    }
 * @apiErrorExample {json}  Error
 *     422 Validation error
 *  {
 *    "msg": "Password must be at least 5 chars long,E-mail already in use"
 *  }
 */
router.post(
  "/",
  validator.validatorForRegistration,
  validator.checkForExistingEmail,
  functionForNewUser
);
module.exports = router;
