var express=require("express");
var passport = require('passport');
var users=require('./routes/userroutes')
var employees = require('./routes/employeeroutes')
var app=express();
const cors=require("cors")
app.use(passport.initialize());
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/users",users)
app.use("/employees",employees)

app.listen("8000",function(){
    console.log("Server running on port 8000")
})