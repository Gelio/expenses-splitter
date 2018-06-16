const { table } = require('table');

const formatPrice = require('./format-price');
const Person = require('./person');

/**
 * @param {Map<string, Person>} people
 */
module.exports = function displaySummary(people) {
  const peopleArray = Array.from(people.values());
  const summary = peopleArray.map(person => {
    const totalExpenses = person.getTotalExpenses();
    const totalUsedProductsCost = person.getTotalUsedProductsCost();

    return [
      person.name,
      formatPrice(totalExpenses),
      formatPrice(totalUsedProductsCost),
      formatPrice(Math.max(0, totalExpenses - totalUsedProductsCost)),
      formatPrice(Math.max(0, totalUsedProductsCost - totalExpenses))
    ];
  });

  const header = [
    'Name',
    'Total expenses',
    'Total used products cost',
    'Should receive',
    'Should pay'
  ];

  console.log(table([header, ...summary]));
};
