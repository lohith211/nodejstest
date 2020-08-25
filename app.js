const express = require('express');
const app = express();
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

//load routes
const userroutes = require('./routes/user');

const morgan = require('morgan');
const bodyParser = require('body-parser');



//db connection
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


//routes Middleware
app.use('/api', userroutes);



const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})