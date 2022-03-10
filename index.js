const express = require('express'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      io = require('socket.io')(server),
      mongo = require('mongoose');

require('dotenv').config();

// Connect Database
const port = process.env.PORT || 1999
mongo.connect(process.env.MONGODB, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(result => {
        server.listen(port, ()=>{
            console.log(`http://localhost:${port}`)
        });
    }).catch(err => console.log(err));

//Middleware
require('./middleware/App')(app);

// Routers
app.get('/',(req, res)=>{
    res.render('Page/HomePage')
})