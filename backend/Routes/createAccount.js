const express = require("express")
const User = require("../Models/UserSchema")
const router = express.Router()

router.post("/",(req,res)=>{
    User.create(req.body).then((id)=>[
        res.json({
            "message":"Creation Successful"
        })
    ]).catch(err=>{
        res.json(err)
    })
})

module.exports =router