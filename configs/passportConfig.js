const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../model/userModel");
const passport = require('passport');


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile", "email"]
},
async function (request, accessToken, refreshToken, profile, done){
    try{
        console.log(profile)
        let data = profile?._json;
        let existingUser = await User.findOne({email: data.email});

        if(!existingUser){ // if user does not exist
            console.log("Creating new User ...");
            const newUser = await User.create({
                firstname: data.given_name,
                lastname: data.family_name,
                user_image: data.picture,
                email: data.email,
            });
            return await done(null, newUser)
        }
        
        return await done(null, existingUser);

    }catch(error){
        return done(error, false)
    }
}
))



passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    done(null, user);
});
