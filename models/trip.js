var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tripSchema   = new Schema({
    meters: Number,
    startDate: String,
    endDate: String,
    locations: [{lat:Number, lng:Number}]
});

module.exports = mongoose.model('Trip', tripSchema);