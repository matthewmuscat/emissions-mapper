
const path = require('path');
const seedFile = require('knex-seed-file');
 
exports.seed = function(knex) {
  console.log(path.resolve('./emissions/emissions.csv'));
  return knex('coData')
    .then(() => seedFile(knex, path.resolve('./emissions/emissions_6.csv'), 'coData',
    {
      columnSeparator: ',',
      ignoreFirstLine: true,
      mapTo: ['entity', 'code', 'year', 'emissions']
    })).catch(err => {
      console.log('err: ', err);
    });
};