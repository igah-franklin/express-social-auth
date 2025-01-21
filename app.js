require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MONGO_URI } = require('./app/database/db');
const mongoose = require('mongoose');
const appRouter = require('./app/routes/index');
const  { corsOptions } = require('./app/config/coresOptions');

const PORT = process.env.PORT || 5000
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', appRouter);

mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=> console.log(`app is running on ${PORT}`));
    console.log('db connected')
}).catch((error)=>{
    console.log(error)
});


