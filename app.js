var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var product = require('./routes/product');
const mongoose = require("mongoose");
const { required } = require('nodemon/lib/config');
require('dotenv').config();

// mongoose
//   .connect("mongodb://localhost:27017/lab34", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected successfully"))
//   .catch((err) => console.log(err));

  require("./components/model/ProductModel");
var app = express();
const PORT = process.env.PORT || 5000

mongoose.set('strictQuery',false)
const connectDB = async ()=> {
  try {
  const conn = await mongoose.connect(process.env.MONGO_URI) ;
  console. log(`MongoDB Connected: ${conn.connection.host}*`);
  } catch (error) {
    console. log(error);
    process. exit(1);
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', product);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

connectDB().then(
  () => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
)

module.exports = app;
