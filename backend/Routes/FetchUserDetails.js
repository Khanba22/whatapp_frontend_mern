const User = require("../Models/UserSchema")
const express = require("express")

const router = express.Router()

router.post("/login",async(req,res)=>{
    const user = req.body
    await User.findOne({email:user.email,password:user.password}).then(user=>{
        res.json(user)
    }).catch(err=>{
        res.status(300).json({
            message:"User Not Found"
        })
    })
})

router.post("/fetchStatus",async(req,res)=>{
    const user = await User.findOne({username:req.body.username}).catch((err)=>{
        res.json({err:err})
    })
    if (user) {
        res.json({lastSeen:user.lastSeen})
    }else{
        res.json({err:"not found"})
    }
})

router.post("/auth",async(req,res)=>{
    const user = req.body
    await User.findOne({email:user.email}).then(user=>{
        res.json(user)
    }).catch(err=>{
        res.status(300).json({
            message:"User Not Found"
        })
    })
})

module.exports = router