const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../Configure/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});
//after successfully sent the id to user, call done
passport.use(new GoogleStrategy({
    clientID: keys.googleCLientID,
    clientSecret: keys.googleClientSecrect,
    callbackURL: 'https://frozen-tor-51520.herokuapp.com/auth/google/callback',  //when google give the code to call
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then(existingUser => {
            if (existingUser) {
                done(null, existingUser);
             
            } else {
                new User({ googleId: profile.id })
                    .save()//save() from local mongoose store to mongoDatabase
                    .then(user=>done(null,user));//this user same one above User but since User saved, it may have some changes
            }

        })
    
})
);
