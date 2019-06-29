module.exports = {
    client: 'postgresql',
    connection: {
        host: 'localhost',       
        port: 32771,
        database: "postgres",
        user: "postgres",
        password: ''
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
    debug: false, // Turn this on if you would like to see SQL statements
};