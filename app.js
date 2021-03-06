require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes 
const authRoutes = require("./routes/auth")
const customerAuthRoutes = require("./routes/customerAuth")
const shopAuthRoutes = require("./routes/shopAuth")
const billRoutes = require("./routes/bill")
const customerRoutes = require("./routes/customer")


// DataBase Connection
mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then(() => {
    console.log("DB CONNECTED");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// My Routes
app.use("/demo",authRoutes);
app.use("/demo",customerAuthRoutes);
app.use("/demo",shopAuthRoutes);
app.use("/demo",billRoutes);
app.use("/demo",customerRoutes)
// PORT 
const port = process.env.PORT || 8000;

// Start server
app.listen(port, ()=> {
    console.log(`app is running at port : ${port}`);
});
