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

Router.get("/users/",(req,res)=>{
    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({messaje:error}))
})

Router.get("/users/:id", (req, res) => {
    const { id } = req.params;

    userSchema
        .findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        });
});

Router.delete("/users/:id",(req,res)=>{
    const {id} = req.params;
    userSchema
        .deleteOne({_id:id})
        .then((data)=>{
            if(!data){
                return res.status(400).json({message: "user not found"});
            }
            res.json({message:"User deleted succesfully"})
        })
        .catch((error)=>{
            console.error(error)
            res.status(500).json({message:"Internal server error"})
        });
});

Router.put("/users/:id",(req,res)=>{
    const {id} = req.params;
    const {name,age,email} =req.body;
    userSchema
        .updateOne({_id:id},{$set:{name,age,email}})
        .then((data)=>{
            if(!data){
                return res.status(400).json({message:"user not found"})
            }
            res.json({message:"User updated succesfully"})
        })
        .catch((error)=>{
            console.error(error)
            res.status(500).json({message:"Internal server error"})
        });
});

module.exports = Router
