const Sequelize = require('sequelize');
const {STRING, ARRAY, BOOLEAN} = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

const Puzzle = db.define('puzzle', {
  author: {
    type: STRING,
    default: ''
  },
  title: {
    type: STRING,
    default: ''
  },
  public: {
    type: BOOLEAN,
    default: false
  }
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
  // await db.sync({force: true});
}


module.exports = {
  db,
  syncAndSeed,
  Puzzle,
  Collection
}
