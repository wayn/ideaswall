
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Bucket schema
 */

var BucketSchema = new Schema({
  name: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

BucketSchema.path('name').required(true, 'Bucket name cannot be blank');

/**
 * Methods
 */

BucketSchema.methods = {
  /**
   * Save bucket
   *
   * @param {Object} request
   * @param {Function} cb
   * @api private
   */

  addBucket: function (cb) {
    // Parse request
    var self = this;
    this.validate(function (err) {
      if (err) return cb(err);
      self.save(cb);
    });
  },

}

/**
 * Statics
 */

BucketSchema.statics = {

  /**
   * Find bucket by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb);
  },

  /**
   * List buckets
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .exec(cb);
  }
}

mongoose.model('Bucket', BucketSchema);