const express = require('express');
const mongoos = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const logger = require('./logger/logger');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Contact = require('./router/router');
 const PORT = config.port;
 const ConnectionString = config.ConnectionString;
logger.info("ConnectionString",ConnectionString);
 app.use('/api', Contact)
const connectToDB = async() =>{
    try{
        await mongoos.connect(ConnectionString,{
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
connectToDB();

const port = PORT;
app.listen(port,()=>{
 logger.info(`Example app listening on port ${port}`);
});
