const express = require("express");
const zod = require("zod");
const  { User,Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config")
const {authMiddleware} = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
    username:zod.string().email(),
    firstName : zod.string(),
    lastName :zod.string(),
    password : zod.string().min(8),
})

router.post('/signup', async (req,res)=>{
        const body = req.body;
        const {success} = signupBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message : "Incorrect Inputs"
            })

        }

        const user = await User.findOne({
        username:req.body.username,
        })
        console.log(user)
        
        if(user){
            return res.json({
                message: "Email already taken/Incorrect Inputs"
            })
        }
        const dbUser = await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName: req.body.lastName,
        });
        const userId = dbUser._id;
        console.log(userId)

        // ------Create New Account--------
        Account.create({
            userId,
            balance:1+Math.random()*10000
        })        
        //---------------------------------

        const userTokenId = dbUser._id;

        const token = jwt.sign({
            userId:userTokenId
        }, JWT_SECRET)
        res.json({
            message:"User Created Successfully",
            token:token
        })
})






const signInbody = zod.object({
    username:zod.string().email(),
    password:zod.string().min(8)
})

router.post("/signin",async (req,res)=>{
    try{
        const {success}= signInbody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message:"Incorrect Inputs",
            })
        }
        const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        
        console.log(user);
        const token = jwt.sign({
            userId:user._id,
        },JWT_SECRET);
        res.json({ 
            token: token,
            message:"Login Success" 
        })
        
    }
}
catch(error){
    res.json({
        message:"Error"
    })
}


}) 

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional(), 
})


router.put('/',authMiddleware, async (req,res)=>{
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error while loading information",
        })
    }

    await User.findOne({
        _id:req.userId,
    })
    res.json({
        message:"Updated Sucessfuly",
    })
})

router.get("/bulk",async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName :{
            "$regex": filter
            }
        }]   
    })
    console.log(users);
    console.log("In getting all users");
    res.json({
        user : users.map(user=>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id:user._id,

        }))
    })
})


module.exports = router;