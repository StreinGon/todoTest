"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer = require("multer");
const authController = require("@src/controllers/auth/authController");
const registrationValidators = require("@src/helpers/validators/registrationValidators");
const otherConstants_1 = require("@src/constants/otherConstants");
const upload = multer({ dest: otherConstants_1.UPLOADS });
const router = express_1.Router();
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
router.post('/', upload.single('avatar'), registrationValidators.registrationValidator, registrationValidators.checkForExistingEmail, (req, res) => authController.singUp(req, res));
exports.default = router;
//# sourceMappingURL=registerform.js.map