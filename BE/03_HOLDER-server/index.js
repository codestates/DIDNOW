//  "start": "pm2-runtime start ecosystem.config.js",
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan')
const Router = require('./routes')

const debug = process.env.NODE_ENV === 'development'
const prod = process.env.NODE_ENV === 'production'

// Configuration
dotenv.config();
const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:3000',
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}));

// DB Connection
mongoose.connect(process.env.MONGO_URL, () => {
  // console.log("Connection to Mongo DB ...");
});

// Router
app.use('/hol/api/v1', Router)

// Error Handling
app.use((err, req, res, next)=>{
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({
    success : false,
    status : status,
    message : message,
  })
})

app.listen(process.env.PORT, () => {
  // 무중단 배포 = Main Processor에게 ready 신호 전달
  prod && process.send("ready");
  // console.log(`Server is on PORT : ${process.env.PORT}`);
});

module.exports = app;