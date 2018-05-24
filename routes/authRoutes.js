const passport = require('passport');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({ bey: 'buddy' });
    });
    app.get('/auth/mygoogle', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/mycallback', passport.authenticate('google'));
    app.get('/api/logout', (req, res) => {
        req.logout();//passport attached the logout method to req
        res.send(req.user);//req.user is already detroied by browers
    });
    app.get('/api/current_user', (req, res) => {
        //res.send(req.session);
        res.send(req.user);//passport attached the user object to req
    });
};
332884332510 - 5jf87sveojt9hsvr00me3b78qntcvftc.apps.googleusercontent.com
mjIbmm8sNXSgc2ZZnUkerU12