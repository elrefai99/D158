const express = require('express'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      io = require('socket.io')(server),
      mongo = require('mongoose'),
      auth = require('./router/Auth'),
      passport = require('passport'),
      user = require('./router/User'),
      {ensureAuthenticated,forwardAuthenticated} = require('./config/AuthConfig'),
      Post = require('./model/Posts'),
      post = require('./router/Post');

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
    const userId = req.user.id;
    Post.find()
        .then(result =>{
            res.render('Page/HomePage',  {user: req.user, result})
        })
})

app.get((req, res)=>{
    res.send('404')
})

app.use(auth)
app.use(user)
app.use(post)
