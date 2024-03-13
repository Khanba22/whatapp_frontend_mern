const express = require("express")
const User = require("../Models/UserSchema")
const router = express.Router()

router.post("/",(req,res)=>{
    User.create(req.body).then((id)=>[
        res.json({
            "message":"Creation Successful",
            id:id
        })
    ]).catch(err=>{
        res.status(300).json(err)
    })
})

module.exports =router