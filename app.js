const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/weather',{  useNewUrlParser: true,useUnifiedTopology: true,});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use(express.static('./static/'));




module.exports = app;
