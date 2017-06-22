var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema ({
    code: String,
    name: String,
});

module.exports = mongoose.model('Stocks', stockSchema);

