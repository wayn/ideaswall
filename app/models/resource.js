
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Resource schema
 */

var ResourceSchema = new Schema({
  bucket: { type: Schema.ObjectId, ref: 'Bucket' },
  name: { type: String, default: '' },
  endpoint: { type: String, default: '' },
  method: { type: String, default: '' },
  request: { 
  	type: String,
  	header: String,
  	body: String
  },
  reponse: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

ResourceSchema.path('name').required(true, 'Resource name cannot be blank');

/**
 * Methods
 */

ResourceSchema.methods = {
	/**
	 * Save resource
   *
   * @param {Object} request
   * @param {Function} cb
   * @api private
   */

  addResource: function (request, cb) {
  	// Parse request
    var self = this; 
  	this.validate(function (err) {
  		if (err) return cb(err);
  		// self.request = { type : '', header : '', body : ''};
  		self.save(cb);
  	});
  },

}

/**
 * Statics
 */

ResourceSchema.statics = {

	/**
   * Find resource by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  },

  /**
   * List resources
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
  	var criteria = options.criteria || {}

  	this.find(criteria)
  		.sort({'createdAt': -1})
  		.limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

mongoose.model('Resource', ResourceSchema);
