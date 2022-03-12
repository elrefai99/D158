const express = require('express'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      io = require('socket.io')(server),
      mongo = require('mongoose'),
      auth = require('./router/Auth'),
      passport = require('passport'),
      user = require('./router/User'),
      {ensureAuthenticated,forwardAuthenticated} = require('./config/AuthConfig');

require('dotenv').config();
require('./config/passport')(passport);
// Connect Database
const port = process.env.PORT || 1999
mongo.connect(process.env.MONGODB, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(result => {
        server.listen(port, ()=>{
            console.log(`http://localhost:${port}`)
        });
    }).catch(err => console.log(err));

//Middleware
require('./middleware/App')(app, passport);

// Routers
app.get('/',ensureAuthenticated, (req, res)=>{
    res.render('Page/HomePage',  {user: req.user})
})

app.use(auth)
app.use(user)
