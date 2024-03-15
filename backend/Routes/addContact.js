const express = require("express")
const User = require("../Models/UserSchema")

const router = express.Router()

router.post("/",(req,res)=>{
    const body = req.body
    const user = User.aggregate([
        {
          $match:
            {
              username: body.username,
            },
        },
        {
          $project:
            {
              username: 1,
              email: 1,
              profilePicture: 1,
              contactNo: 1,
              lastSeen: 1,
            },
        },
      ])
      User.findOneAndUpdate({username:body.from},{
        $push:{
            contacts:user
        }
      })
})


module.exports = router