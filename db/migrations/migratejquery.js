exports.up = function(knex, Promise) {return knex.schema.createTable('jquery', (t) => {t.increments('id').primary();t.timestamps(true, true);t.integer('subtotal');t.integer('taxes');t.integer('total');});};exports.down = function(knex, Promise) {return knex.schema.dropTable('jquery');};