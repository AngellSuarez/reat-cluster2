const express = require("express")
const userSchema = require("../models/user")

const Router = express.Router()

//create user
Router.post("/users",(req,res)=>{
    const user = userSchema(req.body);
    user
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({messaje:error}));
});

Router.get("/users/:id",(req,res)=>{
    const {id} = req.params;
    userSchema
    .finById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({messaje:error}));
});

Router.delete("/users/:id",(req,res)=>{
    const {id} = req.params;
    userSchema
    .deleteOne({_id:id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({messaje:error}));
});

Router.update("/users/:id",(req,res)=>{
    const {id} = req.params;
    const {name,age,email} =req.body;
    userSchema
    .updateOne({_id:id},{$set:{name,age,email}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({messaje:error}));
});

module.exports = Router