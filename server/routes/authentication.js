const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {signup,signin,signout} = require("../controllers/authentication");


router.post("/signup", [
    check("name", "Name should be atleast 3 chars").isLength({min: 3}),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be atleast 3 chars").isLength({min: 3})
], signup);

router.post('/signin', [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be atleast 3 chars").isLength({min: 3})
], signin); 

router.get("/signout", signout);

module.exports = router;

