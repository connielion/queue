const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const dbRouter = require('./routes/dbRouter.js');
const apiRouter = require('./routes/api');

const PORT = 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// When we have assets
// app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

// Database calls
app.use('/dbRouter', dbRouter);

// Yelp API calls
app.use('/api', apiRouter);

app.use('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/index.html')))


// 404 handler
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});


// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


/*** SOCKETS */
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  })
})

io.on('disconnect', function() {
  console.log('user disconnected');
});

http.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})



module.exports = app;
