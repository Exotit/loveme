var mongoose = require('mongoose');

var ChapterSchema = new mongoose.Schema({
    index: Number,
    slides: [{index:Number}]
});

module.exports = mongoose.model('Chapter', ChapterSchema);
