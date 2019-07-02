const postgres = require('./postgres');

const getEmissionsByYear = async (event, context) => {
  try {
    const { year } = event.pathParameters

    const db = await postgres();
    const emissionData = await db('coData')
        .select('entity', 'code', 'year', 'emissions')
        .where({ year: parseInt(year) });

    await db.destroy();

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

const getRangeByYear = async (event, context, callback) => {
    try { 
        const { year } = event.pathParameters
        console.log('hit');
        const db = await postgres();
        const rangeInfo = await db('coData')
            .max('emissions')
            .min('emissions')
            .where({ year: parseInt(year) })
            .whereNot({ emissions: 0 })

        await db.destroy();
        return {
            statusCode: 200,
            body: JSON.stringify(rangeInfo),
        };
    } catch (err) {
        console.log('error found: ', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
            }),
        };
    }
}

module.exports = {
    getEmissionsByYear,
    getRangeByYear,
}