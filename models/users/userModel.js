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
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    email : {
        type: String,
        required: true,
        unique : true,
        index: true,
        trim: true
    },
    profile:{
        user_image : {
            public_id: String,
            url: {
                type: String,
                default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKf7bdPa_aOiwGzeNO4YY4YwvAya-Hy8vOUtOFkfi1SD3HDDhjCz7Ux6OqLKNiD3SIxM&usqp=CAU"
            }
        },
        dob: {
            type: Date,
        },
        address: {
            street: {
                type: String,
                trim: true,
                maxLength:  60
            },
            city: { type: String, maxLength:  20},
            state: {type: String, maxLength:  20},
            zipCode: {type: String, maxLength:  20},
            country: {type: String, maxLength:  20}
        },
        bio: {
            type: String,
            trim: true,
            maxLength:  60
        },
        hobbies: [{
            type: String,
            trim: true
        }],
        mobile_no:{
            type: String,
            required: false
        },
        profession :{
            type: String,
        },
        locale: {
            type: String,
            enum: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ru', 'other'],
            default: 'en' // Default language
        }
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
    isBlocked :{
        type: Boolean,
        default: false,
    },
    emailVerified: {
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
