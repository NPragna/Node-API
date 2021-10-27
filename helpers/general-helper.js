const AppConstants = require('../helpers/constants');
let isEmpty = function(value) {
    if(!value || value === undefined || typeof value === 'undefined' || value === '' || value.length === 0) {
        return true;
    } else {
        return false;
    }
}

let sortResultsInDescending = (campaigns) => {
    return campaigns.sort((a,b) => b.totalAmount - a.totalAmount);
};

let connectAPI = async () => {
    const rp = require("request-promise");
    const options = {
        'method': 'GET',
        'url': process.env.CONNECTION_URL,
        'headers': { },
    };
    const campaigns = await rp(options);
    return JSON.parse(campaigns);
}

let getDateInEpoch = (value) => {
    date =  value ? new Date(value) : new Date();
    return date.setHours(0, 0, 0, 0);
}

let getDateofSpecifcDateinEpoch = (days) => {
    const a = new Date().getDate() - days
    const b = new Date().setDate(a);
    const prior_date = new Date(b).setHours(0,0,0,0);
    return prior_date;
}


module.exports = {
    isEmpty,
    sortResultsInDescending,
    connectAPI,
    getDateInEpoch,
    getDateofSpecifcDateinEpoch
}