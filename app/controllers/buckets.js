
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Bucket = mongoose.model('Bucket')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){

  Bucket.load(id, function (err, bucket) {
    if (err) return next(err);
    if (!bucket) return next(new Error('not found'));
    req.bucket = bucket;
    next();
  });
};

/**
 * New bucket
 */

exports.new = function (req, res){
  res.render('buckets/form', {
    title: 'New Bucket',
    bucket: new Bucket({})
  });
};

/**
 * Create a bucket
 */

exports.create = function (req, res) {
  var bucket = new Bucket(req.body);
  console.log(bucket);
  bucket.name = req.body.name;
  bucket.addBucket(function (err) {
    if (!err) {
      console.log(bucket.name);
      req.flash('success', 'Successfully created bucket!');
      return res.redirect('/buckets/'+bucket._id);
    }
    console.log(err);
    res.render('buckets/form', {
      title: 'New Bucket',
      bucket: bucket,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('buckets/bucket', {
    title: req.bucket.name,
    bucket: req.bucket
  });
};
