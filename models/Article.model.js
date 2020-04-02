var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortid = require('shortid');

var ArticleSchema = new Schema({
    _id: {type: String, default: shortid.generate},
    title:  { type : String, required : true},
    dateCreated: { type: Date, default: Date.now, required: true },
    content: { type : String, required : true},
    author :  { type : String, required : true, ref : 'Author' },
    category : { type : String, required : true, ref : 'Category' }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;