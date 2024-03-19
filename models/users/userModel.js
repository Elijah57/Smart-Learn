const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
//Declare the schema of the mogo model

var userSchema  = new mongoose.Schema({
    firstname : {
        type: String,
        required: false,
        trim: true

    },
    lastname : {
        type: String,
        required: true,
        trim: true,
    },
    user_image : {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKf7bdPa_aOiwGzeNO4YY4YwvAya-Hy8vOUtOFkfi1SD3HDDhjCz7Ux6OqLKNiD3SIxM&usqp=CAU"

    },
    image_pubId: {
        type: String,
    },
    email : {
        type: String,
        required: true,
        unique : true,
        index: true,
        trim: true
    },
    mobile:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: false
    },

    roles: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student"
    },
    profession :{
        type: String,
        // required: true
    },
    isBlocked :{
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    activationToken: String,
    activationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
},
{
    timestamps: true,
}
);


// Encrypt the password with bcrypt -callback to be implemented before each user save
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){ // check if a password field is modified
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// create Email verification token to verity user account
userSchema.methods.createActivationToken = async function(){
    const activationCode = crypto.randomBytes(32).toString("hex");
    this.activationToken = crypto.createHash("sha256").update(activationCode).digest("hex");
    this.activationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return activationCode;
}

// login functionality -callback to compare password creating a method, that checks)
userSchema.methods.isPasswordMatched = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
}


userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
}


module.exports = mongoose.model("User", userSchema)
