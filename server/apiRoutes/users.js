const router = require('express').Router()
const User = require('../db/users')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/verify'
  }

const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
  
    User.findOne({where: { googleId: googleId  }})
      .then(function (user) {
        if (!user) {
          return User.create({ name, email, googleId })
            .then(function (user) {
              done(null, user);
            });
        } else {
          done(null, user);
        }
      })
      .catch(done);
  });

passport.use(strategy)

router.get('/', function (req, res, next) { /* etc */})

router.get('/me', (req, res, next) => {
    res.json(req.user);
  })

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('/auth/google/verify', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.post('/', function (req, res, next) { /* etc */})

router.put('/:userId', function (req, res, next) { /* etc */})

router.post('/signup', async(req,res,next)=>{
    try {
        const newUser = await User.create(req.body);
        req.login(user=>{res.json(user)})
    } catch (error) {
        next(error)
    }
})

router.put('/login', (req,res,next)=>{
    try{
        const thisUser = User.findOne({
        where: {
            email: req.body.email
        }});
        if(!user){
            res.status(401).send('We could not locate that user.')
        }else if(!user.correctPassword(req.body.password)) res.status(401).send('Incorrect password.')
        else{
            req.login(user=>{res.json(user)})
        }
    }catch(err){
        next(err)
    }
})
router.delete('/:userId', function (req, res, next) { /* etc */});

router.delete('/logout', (req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.sendStatus(204)
})

module.exports = router;