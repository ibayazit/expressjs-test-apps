const express = require("express");
const router = express.Router();
const { login, register, user, verify } = require("./auth.controller");

const loginValidation = require("./validations/login.validation");
const registerValidation = require("./validations/register.validation");
const verifyValidation = require("./validations/verify.validation");

router.route("/login").post(loginValidation, login);
router.route("/register").post(registerValidation, register);
router.route("/verify").post(verifyValidation, verify);
router.route("/check").post(user);

module.exports = router;
