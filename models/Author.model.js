var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortid = require('shortid');

var AuthorSchema = new Schema({
    _id: {type: String, default: shortid.generate},
    name:  { type : String, required : true},
});

var Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;