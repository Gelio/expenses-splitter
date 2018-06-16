const yargs = require('yargs');

module.exports = function argumentsParserFactory() {
  return yargs
    .demandCommand()
    .usage(
      '$0 <file-path> [options]',
      'split the expenses given in the file',
      yargs => {
        yargs.positional('file-path', {
          type: 'string'
        });
      }
    )
    .boolean(['d'])
    .describe('d', 'Display detailed information on each person')
    .alias('d', ['details', 'display-details'])
    .demandOption(['names', 'buyer-column-name', 'price-column-name'])
    .option('names', {
      array: true,
      type: 'string',
      describe: 'Names of people in the expenses',
      alias: 'n'
    })
    .option('buyer-column-name', {
      type: 'string',
      describe: 'The name of the column with the buyer',
      alias: 'b'
    })
    .option('price-column-name', {
      type: 'string',
      describe: 'The name of the column with the price',
      alias: 'p'
    })
    .option('name-column-name', {
      type: 'string',
      describe: 'The name of the column with the name of the purchased product'
    })
    .help();
};
