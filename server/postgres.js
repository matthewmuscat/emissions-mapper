const knex = require('knex');

module.exports = () => {
    return knex({
        client: 'postgresql',
        connection: {
            host:       process.env.PGHOST,
            port:       process.env.PGPORT,
            database:   process.env.PGDATABASE,
            user:       process.env.PGUSER,
            password:   process.env.PGPASSWORD,
        },
        pool: {
            min: 2,
            max: 10
        },
    });
}