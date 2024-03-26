const express = require('express');
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default :mongoose} = require("mongoose");



const router = express.Router();

router.get("/balance",authMiddleware, async (req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });
    
    res.json({
        balance:account.balance
    })

});

router.post('/transfer',authMiddleware, async (req,res)=>{
        const session = await mongoose.startSession();

        session.startTransaction();
        const   { amount,to } = req.body;
        console.log("Session Start");


        //Details of the Account that performs transactions

        const account = await Account.findOne({userId:req.userId}).session(session);
        
        console.log(account.userId);
        console.log(account.balance);
        if(!account|| account.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Insufficient balance",
            });
        }

        const toAccount = await Account.findOne({userId:to}).session(session);

        if(!toAccount){
            console.log("User Not available");
            await session.abortTransaction();
            res.status(400).json({
                message:"User not available"
            })
        }



        //Trasfering the amount 

        await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
        
        await session.commitTransaction();
        console.log("Transfer Success");
        res.json({
            message:"Transfer Successful",
        })
        console.log("Session End");
})

module.exports=router