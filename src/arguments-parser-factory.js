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
    .boolean(['t'])
    .describe(
      't',
      'Skip displaying the list of products and only display the total'
    )
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
    .alias('t', 'total-only')
    .help();
};
