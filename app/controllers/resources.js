
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Resource = mongoose.model('Resource')
var Bucket = mongoose.model('Bucket')
var utils = require('../../lib/utils')
var extend = require('util')._extend


/**
 * Load
 */

exports.load = function (req, res, next, id) {

  Resource.load(id, function (err, resource) {
    if (err) return next(err);
    if (!resource) return next(new Error('not found'));
    req.resource = resource;
    next();
  });
};

/**
 * New resource
 */

exports.new = function (req, res) {
	Bucket.last(function (err, buckets) {

		req.session.bucket = buckets[0];
		res.render('resources/form', {
		    title: 'New Resource',
		    resource: new Resource({})
		});
	});
  
};

/**
 * Create a resource
 */

exports.create = function (req, res) {
  var resource = new Resource(req.body);
  resource.name = req.body.name;
  resource.bucket = req.session.bucket;
  resource.addResource(req, function (err) {
    if (!err) {
      req.flash('success', 'Successfully created resource!');
      return res.redirect('/resources/'+resource._id);
    }
    console.log(err);
    res.render('resources/form', {
      title: 'New Resource',
      resource: resource,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('resources/resource', {
    title: req.resource.name,
    resource: req.resource
  });
};
