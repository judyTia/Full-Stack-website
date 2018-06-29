const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./Configure/keys');
require('./models/User');
require('./Services/passport');//just need the code to execute no things return, so no assignment needed


(async () => {
    try {
        await mongoose.connect(keys.mongoURI);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
    const app = express();

    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,

            keys: [keys.cookieKey]
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    require('./routes/authRoutes')(app);

    const PORT = process.env.PORT || 7000;
    app.listen(PORT);
})();