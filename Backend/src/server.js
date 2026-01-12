require("dotenv").config();
const express =require('express');
const app =express();
const connectDB =require("./config/connectDB");

const PORT =process.env.PORT;
//branch check
connectDB();

app.listen(PORT,(req,res)=>{
    console.log(`server is running at port:${PORT}`);
});

