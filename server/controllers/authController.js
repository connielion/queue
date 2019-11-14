const db = require('../models/models');

module.exports = {
    setCookie: function(req, res, next) {
        const cookieId = Math.floor(Math.random()*10000)*Math.floor(Math.random()*10000);
        res.cookie('ssid', cookieId, { httpOnly: true });
        res.locals.cookie = cookieId;
        return next();
    },

    createSession: async function(req, res, next) {
        const queryStr1 = `
        SELECT id FROM users 
        WHERE (username = $1)`
        const queryStr2 = `
        INSERT INTO sessions (cookieId, user_id)
        VALUES ($1, $2)`

        await db.query(queryStr1, [res.locals.username])
          .then(data => {
              res.locals.id = data.rows[0].id;
          })
          .catch(err => console.log('Error retrieving user by username'))

        db.query(queryStr2, [res.locals.cookie, res.locals.id])
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
        SELECT user_id FROM sessions
        WHERE cookieId = ($1)`
        db.query(queryStr, [cookie])
          .then(data => {
              console.log("Data: ", data.rows);
              if (data.rows.length === 0) {
                  return res.status(404).json({ invalidSession: 'Invalid session' })
              }
              res.locals.user = data.rows[0].user_id;
              return next();
          })
          .catch(err => next(err));
    },
    
}