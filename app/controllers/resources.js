
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Resource = mongoose.model('Resource')

/**
 * New Resource
 */

exports.new = function (req, res){
  res.render('resources/form', {
    title: 'New Resource',
    resource: new Resource({})
  });
};