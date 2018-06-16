#!/usr/bin/env node

const csv = require('csv');
const fs = require('fs');
const { promisify } = require('util');

const Person = require('./person');
const transformProductRow = require('./transform-product-row');
const argumentsParserFactory = require('./arguments-parser-factory');
const displaySummary = require('./display-summary');

const argumentsParser = argumentsParserFactory();
const {
  totalOnly,
  filePath,
  names,
  buyerColumnName,
  priceColumnName,
  nameColumnName
} = argumentsParser.argv;

(async () => {
  if (!(await promisify(fs.exists)(filePath))) {
    console.warn(`File ${filePath} does not exist`);
    argumentsParser.showHelp();

    return;
  }

  /** @type {Map<string, Person>} */
  const people = new Map();

  const csvParseStream = csv.parse({
    cast_date: true,
    columns: true
  });
  csvParseStream.on(
    'data',
    transformProductRow.bind(
      {},
      {
        people,
        names,
        buyerColumnName,
        priceColumnName,
        nameColumnName
      }
    )
  );
  csvParseStream.on('error', () => {
    console.error('Error while parsing CSV');
  });
  csvParseStream.on('end', () => displaySummary(totalOnly, people));

  fs.createReadStream(filePath).pipe(csvParseStream);
})();
