
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var buckets = require('buckets');
var resources = require('resources');

/**
 * Expose
 */

module.exports = function (app, passport) {

    app.get('/', home.index);

    // resource routes
    app.get('/resources/new', resources.new);

    // bucket routes
    app.param('id', buckets.load);
    app.get('/buckets/new', buckets.new);
    app.post('/buckets', buckets.create);
    app.get('/buckets/:id', buckets.show);

    /**
    * Error handling
    */

    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
             && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
        });
    });
};
