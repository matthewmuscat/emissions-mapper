const uuid = require('uuid/v4')

exports.up = knex => {
    return knex.schema.hasTable('coData').then(exists => {
        if (!exists) {
            return knex.schema.createTable('coData', table => {
                table.increments('id').primary();
                table.string('entity').notNullable();
                table.string('code');
                table.integer('year').notNullable();
                table.float('emissions');
            });
        }
    });
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('coData');
};