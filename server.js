const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cors = require("cors");

//User Routes
const todoRoute = require('./Routes/todo');
const connectDB = require("./config/db");

// App Config...
const app = express();                  // instanciating express() in app variable
dotenv.config();                        // to use .env variables
const Port = process.env.Port || 4000;

// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use("/todos", todoRoute);

// DB Config
connectDB();

//Default Route
app.get("/", (req, res) => {
    res.send("Hello From Server All Ok.........");
});


//Port for listening
app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})

