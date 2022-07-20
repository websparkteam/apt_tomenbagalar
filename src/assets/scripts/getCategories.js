let cats = require('./cats.json');
module.exports = Object.keys(cats).map((key) => cats[key]);
console.log(Object.keys(cats).map((key) => cats[key]));