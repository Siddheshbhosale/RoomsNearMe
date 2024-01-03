const { mongoose } = require('mongoose');
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authentication = require("./routes/authentication");


mongoose
.connect(process.env.DATABASE)
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

const app = express(); 
// Init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// The middleware logs information about each incoming request.
app.use("/", (req, res, next) => {
	console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
	next();
});

// Routes:
app.use("", authentication);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`);
});