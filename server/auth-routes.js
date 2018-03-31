const router = require('express').Router();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys.js');
const firebase = require('./database');
var axios = require('axios');

var mega = function(token, cb) {
  var headers = {
    access_token: token
  }
  let finalArray = [];
  axios.get(`https://www.googleapis.com/calendar/v3/calendars/hackreactor.com_v5k5rbga5om6rvfl65r259c0tk@group.calendar.google.com/events/?access_token=${token}`, headers)
  .then((data) => {
    var newArray = data.data.items.map((item) => {
      return {
        name: item.summary,
        id: item.id
      }
    })
    finalArray = newArray.map((item, i) => {
      let id = item.id;
        axios.get(`https://www.googleapis.com/calendar/v3/calendars/hackreactor.com_v5k5rbga5om6rvfl65r259c0tk@group.calendar.google.com/events/${id}?access_token=${token}`)
        .then((res) => {
          item.time = res.data.start;
          // console.log(item);
          cb(item, newArray.length-1 === i);
          // firebase.storeCalendar(item);
        }).catch((err) => {
          console.log("err" , err);
        })
    })
    //console.log('final arr', finalArray);
    })
  .catch((err) => {
    console.log("err" , err);
  })
  console.log('asdfadsgadgg');
  return finalArray
}


//init google strategy
passport.use(
  new googleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    passReqToCallback: true,
  }, (reqThingy, accessToken, refreshToken, profile, done) => {
    //passport callback function
    firebase.storeToken(accessToken, refreshToken,  reqThingy.query.state)
    console.log('thingy:', accessToken, refreshToken,  reqThingy.query.state); // THIS HAS PARAMS, QUERY, BODY and all that other good stuff
    // mega(accessToken);
    firebase.storeToken(accessToken, refreshToken, reqThingy.query.state);
    return done(null, profile);
  })
)


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.get('/calendar', (req, res) => {
  console.log("hit calendar");
  firebase.getToken(req.query.userId).then(async (data) => {
    // mega(data.accessToken);
    let arr = []
    await mega(data.accessToken, (item, end) => {
      //console.log(item);
      arr.push(item);
      if (end) {
        res.status(200).send(arr);
      }
    });
  }).catch((err) => {
    console.log(err);
  })
  // mega(req.query.userId);
})


router.get('/test', (req, res) => {
  console.log("hit auth test");
})
//callback for google to redirect to calendar

router.get('/google/redirect/', passport.authenticate('google', {
  successRedirect: '/auth/testing',
  failureRedirect: '/auth/testing',
}), (req, res) => {
console.log("redirect", req.body);
});

router.get('/google', (req, res, next) => {
  console.log("req1", req.query);
  passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/calendar'],
    accessType: 'offline',
    approvalPrompt: 'force',
    state: req.query.userId,
  })(req, res, next);
});
//login with token for google calendar
router.get('/testing', (req, res) => {
  res.status(200).send("callback URI");
});

router.get('/login', (req, res) => {
  firebase.getToken(req.body.params.id).then((token) => {
  });
});

router.get('/token', (req, res) => {
  firebase.getToken(req.query.userId).then((token) => {
    res.send({token, poop: 'POOPOY'})
  });
})


module.exports = router;
