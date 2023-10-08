const mongoose =  require("mongoose");

userSchema=mongoose.Schema({
    companyName:{type:String,unique:true,require:true},
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password: {type:String,require:true},
    resetToken: String,
    resetTokenExpiry: Date,
    
})


module.exports= mongoose.model("user",userSchema)