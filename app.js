require('dotenv').config();
const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      prot          = process.env.PORT || 3000,
      layouts       = require('express-ejs-layouts'),
      methodOverride= require('method-override')
      routerIndex   = require('./routes/index'),
      routerAuthors = require('./routes/authors'),
      routerBook    = require('./routes/books')
      connect_DB    = require('./db/connect');

app.set('view engine' ,'ejs'),
app.set('views', __dirname + '/views');
app.set('layout' ,'layouts/layout');
app.use(methodOverride('_method'))
app.use(layouts);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routerIndex);
app.use('/authors', routerAuthors),
app.use('/books', routerBook)

connect_DB();
app.listen(prot,()=>{console.log('SERVER RUNNING...')})