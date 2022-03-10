const express =require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      expressLayouts = require('express-ejs-layouts');

module.exports = app => {
    // Ejs
    app.use(expressLayouts);
    app.set('view engine', 'ejs');

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: true}))
    app.use(express.static('public/js'))
    app.use(express.static('public/css'))
}