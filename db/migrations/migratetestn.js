exports.up = function(knex, Promise) {
return knex.schema.createTable('testn', (t) => {
t.increments('id').primary();
t.timestamps(true, true);
t.integer('subtotal');t.integer('taxes');t.integer('total');t.string('name');t.string('comment');
});
};
exports.down = function(knex, Promise) {
return knex.schema.dropTable('testn');
};