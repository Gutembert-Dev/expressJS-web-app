const { Model }      = require('objection');
const Knex           = require('knex');
var knexfile         = require(__dirname + '/../knexfile');

var development = knexfile.development;
var staging     = knexfile.staging;
var production  = knexfile.production;

// Initialize knex.
const knex = Knex(development);

// Give the knex object to objection.
Model.knex(knex);

module.exports = {
    knex,
    Model
}
