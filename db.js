const Sequelize = require('sequelize');
const {STRING, ARRAY, BOOLEAN} = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL, '', '', {dialect: 'postgres'});

const Puzzle = db.define('puzzle', {
  author: STRING
}) 

const Collection = db.define('collection', {
  theme: STRING,
  squares: ARRAY(STRING),
  solved: {
    type: BOOLEAN,
    defaultValue: false
  }
})

Collection.belongsTo(Puzzle)
Puzzle.hasMany(Collection, {as: 'rows'})

const syncAndSeed = async() => {
  await db.sync({force: true});
}


module.exports = {
  db,
  syncAndSeed,
  Puzzle,
  Collection
}
