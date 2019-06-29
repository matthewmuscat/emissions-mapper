const uuid = require('uuid/v4')

exports.up = knex => {
    return knex.schema.hasTable('coData').then(exists => {
        if (!exists) {
            return knex.schema.createTable('coData', table => {
                table.uuid('id').primary().defaultTo(uuid());
                table.string('entity').notNullable();
                table.string('code').notNullable();
                table.integer('year').notNullable();
                table.integer('emissions').notNullable();
                table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
                table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
            });
        }
    });
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('coData');
};