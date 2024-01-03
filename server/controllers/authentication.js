const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg
            });
        }
        console.log("inside the signup");

        const user = new User(req.body);
        const response = await user.save();
        res.json(response);
    } catch(err) {
        res.status(500).json({ error: err.message });
        console.log('Ohhhh nooo!');
        console.log(err.message);
    }
};

