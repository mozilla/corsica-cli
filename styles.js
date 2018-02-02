const {bold, red, green, yellow} = require('chalk');

module.exports = {
  good: bold.green,
  bad: bold.red,
  info: bold,
  notice: bold.yellow
};
