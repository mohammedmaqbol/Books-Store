require('dotenv').config();
const express  = require('express');
      app      = express(),
      prot     = process.env.PORT || 3000,
      layouts  = require('express-ejs-layouts'),
      route    = require('./routes/index'),
      connect_DB  = require('./db/connect');

app.set('view engine' ,'ejs'),
//app.set('views', __dirname + '/views');
app.set('layout' ,'layouts/layout');
app.use(layouts);
//app.use(express.static('public'));
app.use('/', route);

connect_DB();
app.listen(prot,()=>{console.log('SERVER RUNNING...')})