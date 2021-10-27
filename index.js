require('dotenv').config();
const GetDataController = require('./controllers/get-data-controller');
var logger = require('logger').createLogger(process.env.LOG_FILE_PATH); // logs to a file
if (process.env.NODE_ENV == "prod") {
    // can include some production related configurations
    // newrelic setup
}

const express = require('express');
const app = express();

app.get('/getCampigns', GetDataController.getCampigns);
app.get('/activeCampigns', GetDataController.activeCampigns);
app.get('/closedCampigns', GetDataController.closedCampigns);
 
app.listen(process.env.PORT)
logger.info('started with PORT ::'+process.env.PORT);