const db = require('../models/models');

module.exports = {
    setCookie: function(req, res, next) {
        const cookieId = Math.floor(Math.random()*10000)*Math.floor(Math.random()*10000);
        res.cookie('ssid', cookieId, { httpOnly: true });
        res.locals.cookie = cookieId;
        return next();
    },

    createSession: function(req, res, next) {
        const queryStr = `
        INSERT INTO sessions (cookieId)
        VALUES ($1)`

        db.query(queryStr, [res.locals.cookie])
          .then(data => {
              
              res.locals.session = true;
              return next();
          })
          .catch(err => next({ error: err}));
    },

    isLoggedIn: function(req, res, next) {
        
        if (!req.headers.cookie) return next({error: 'No valid session active'});
        const cookie = req.cookies.ssid;
        const queryStr = `
        SELECT cookieId FROM sessions
        WHERE cookieId = ($1)`
        // console.log("Cookie: ", req);
        db.query(queryStr, [cookie])
          .then(data => {
            //   console.log("Data: ", data.rows);
              if (data.rows.length === 0) {
                  return res.status(404).json({ invalidSession: 'Invalid session' })
              }
              return next();
          })
          .catch(err => next(err));
    }
}