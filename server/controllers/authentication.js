const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log('Ohhhh nooo!');
        console.log(err.message);
    }
};


exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
                
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign( { _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30m" });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullName },
                    });
                } else {
                    res.status(401).json({
                        Error: "Invalid Email / Password",
                    });
                }
        }
        else {
            res.status(400  ).json({
                Error: "User does not exist..!",
            });
        }
    }
    catch (err) {
        res.status(500).json({ Error: err.message });
        console.log('Ohhhh nooo!');
        console.log(err.message);
    }
}

exports.signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		msg: "User signout successful"
	});
};