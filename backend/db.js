

const mongoose = require("mongoose");

mongoose.connect("Data_Base_Connection_String_Here");

const userSchema =  mongoose.Schema({
    firstName:String,
    lastName:String,
    username : String,
    password : Number
})


const accountSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //reference to user model
        ref:'users',
        required: true
    },
    balance :{
        type:Number,
        required:true

    }
});


//Creating a collection
const Account = mongoose.model('Account',accountSchema);
const User= mongoose.model('User',userSchema);

module.exports ={
    User,
    Account
}
