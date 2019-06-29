
// const seeder = require('knex-csv-seeder');
 
// exports.seed = seeder({
//   table: 'coData',
//   file: './cumulative-co-emissions.csv',
// });

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
