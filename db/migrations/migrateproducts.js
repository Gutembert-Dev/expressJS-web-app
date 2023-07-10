exports.up = function(knex, Promise) {
return knex.schema.createTable('products', (t) => {
t.increments('id').primary();
t.timestamps(true, true);
t.string('title');t.integer('price');t.string('name');t.string('description');t.boolean('public');
});
};
exports.down = function(knex, Promise) {
return knex.schema.dropTable('products');
};