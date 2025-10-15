const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./logger/logger');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Contact = require('./router/router');
const { port, ConnectionString } = config;
 app.use('/api', Contact)
const connectToDB = async() =>{
    try{
        await mongoose.connect(ConnectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
       logger.info("connected to mongoDB")
    }
    catch(error){
        logger.error(error);
        process.exit(1);
    }

}
const startServer = async () => {
  await connectToDB(); // wait for DB connection before starting server
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
};
startServer();
