exports.up = function(knex, Promise) {return knex.schema.createTable('camertechgut', (t) => {t.increments('id').primary();t.timestamps(true, true);t.string('firstName');t.string('lastName');t.integer('age');});};exports.down = function(knex, Promise) {return knex.schema.dropTable('camertechgut');};