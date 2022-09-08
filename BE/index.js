const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const credentialRouter = require('./routes/credential')
const testRouter = require('./routes/test')

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
  console.log("Connection to Mongo DB ...");
});

// Router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/credential', credentialRouter)
app.use('/api/v1/test', testRouter);

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
  console.log(`Server is on PORT : ${process.env.PORT}`);
});