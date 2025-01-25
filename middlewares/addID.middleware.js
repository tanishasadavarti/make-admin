const fs = require('fs');
const addID = (req, res, next) => {
  const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
  const newID = db.heroes.length > 0 ? db.heroes[db.heroes.length - 1].id + 1 : 1;
  req.body.id = newID;
  next();
};

module.exports = addID;