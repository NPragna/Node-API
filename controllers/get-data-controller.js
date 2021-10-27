const HttpStatusCodes = require('http-status-codes');
const Generalhelper = require('../helpers/general-helper');
const ErrorConfig = require('../helpers/error-config');
const AppConstants = require('../helpers/constants');
var log = require('logger').createLogger(process.env.LOG_FILE_PATH); // logs to a file

const getCampigns = async function(req, res) {
    let result = [];
    try {
        const campaigns = await Generalhelper.connectAPI();
        if(!Generalhelper.isEmpty(campaigns)) {
            const mapped_data = campaigns.map( e =>{ return {'title': e.title, 'totalAmount': parseInt(e.totalAmount), 'backersCount': e.backersCount, 'endDate': e.endDate} });
            result = Generalhelper.sortResultsInDescending(mapped_data, AppConstants.appConstants.descending);
        } else {    
            log.error('Empty Response from API'); 
        }        
    } catch(e) {
        log.error('Error response form API is:: '+ e.message);
        return res.statprocuredAmount >= eachCampaign.totalAmountus(HttpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorConfig.errorConfig.empty_response);
    }
    return res.status(HttpStatusCodes.StatusCodes.OK).json(result);
}

const activeCampigns = async function(req, res) {
    let result = [];
    try {
        const campaigns = await Generalhelper.connectAPI();
        if(!Generalhelper.isEmpty(campaigns)) {
            const prior_date= Generalhelper.getDateofSpecifcDateinEpoch(30);
            let today = Generalhelper.getDateInEpoch();
            result = campaigns.filter(eachCampaign => (Generalhelper.getDateInEpoch(eachCampaign.endDate) >= today && Generalhelper.getDateInEpoch(eachCampaign.created) >= prior_date));
        } else {    
            log.error('Empty Response from API'); 
        }        
    } catch(e) {
        log.error('Error response form API is:: '+ e.message);
        return res.status(HttpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorConfig.errorConfig.empty_response);
    }
    return res.status(HttpStatusCodes.StatusCodes.OK).json(result);
}

const closedCampigns = async function(req, res) {
    let result = [];
    try {
        const campaigns = await Generalhelper.connectAPI();
        if(!Generalhelper.isEmpty(campaigns)) {
            let today = Generalhelper.getDateInEpoch();
            result = campaigns.filter(eachCampaign => (Generalhelper.getDateInEpoch(eachCampaign.endDate) < today || eachCampaign.procuredAmount >= eachCampaign.totalAmount));
        } else {    
            log.error('Empty Response from API'); 
        }        
    } catch(e) {
        log.error('Error response form API is:: '+ e.message);
        return res.status(HttpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorConfig.errorConfig.empty_response);
    }
    return res.status(HttpStatusCodes.StatusCodes.OK).json(result);
}

module.exports = {
    getCampigns,
    activeCampigns,
    closedCampigns
}