var Chapter = require('../models/Chapter');

this.getChapter = function(req, res, next) {
    return Chapter.findOne({index: req.params.chapter}, function(err, chapter) {
        if(err === null) {
          res.status(200).send({data : chapter});
        }
    });
};


this.getSlide = function(req, res, next) {
    console.log(req.params.slide);
    return Chapter.find({index: req.params.chapter}, {slides: {$elemMatch: {"index": req.params.slide}}}, function(err, slide) {
        if(slide.length > 0){
            if(err === null) {
              res.status(200).send(slide[0].slides[0]);
            }
        }
    });
};

module.exports = this;
