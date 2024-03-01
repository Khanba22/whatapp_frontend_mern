const User = require("../Models/UserSchema")
const express = require("express")

const router = express.Router()

router.post("/",async(req,res)=>{
    const user = req.body
    await User.findOne({username:user.username}).then(user=>{
        res.json(user)
    }).catch(err=>{
        res.status(300).json({
            message:"User Not Found"
        })
    })
})

module.exports = router