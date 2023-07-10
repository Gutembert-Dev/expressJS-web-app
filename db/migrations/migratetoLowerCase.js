exports.up = function(knex, Promise) {
return knex.schema.createTable('tolowercase', (t) => {
t.increments('id').primary();
t.timestamps(true, true);
t.integer('subtotal');t.integer('taxes');t.integer('total');t.string('name');
});
};
exports.down = function(knex, Promise) {
return knex.schema.dropTable('tolowercase');
};