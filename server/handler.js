const knex = require('knex');
const postgres = require('./postgres');

const getEmissionsByYear = async (event, context) => {
  try {
    const { year } = event.pathParameters

    const db = await postgres();
    const emissionData = await db('coData')
        .select('entity', 'code', 'year', 'emissions')
        .where({ year: parseInt(year) });

    return {
        statusCode: 200,
        body: JSON.stringify(emissionData),
    };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
            }),
        };
    }
};

module.exports = {
    getEmissionsByYear,
}