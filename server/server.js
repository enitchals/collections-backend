const { db, Puzzle, Collection, syncAndSeed } = require('../db')
const express = require('express');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.post('/create', async(req, res, next) => {
  try {
    const newPuzzle = await Puzzle.create(req.body.author);
    await Collection.create({...req.body.rows[0], puzzleId: newPuzzle.id});
    await Collection.create({...req.body.rows[1], puzzleId: newPuzzle.id});
    await Collection.create({...req.body.rows[2], puzzleId: newPuzzle.id});
    await Collection.create({...req.body.rows[3], puzzleId: newPuzzle.id});
    res.send({id: newPuzzle.id});
  }
  catch(err){
    next(err);
  }
})

app.get('/puzzle/:id', async(req, res, next) => {
  try {
    const puzzle = await Puzzle.findByPk(req.params.id, { include: { model: Collection, as: 'rows' }});
    res.send(puzzle);
  }
  catch(err){
    next(err);
  }
})

const PORT = 3000;

const init = async() => {
  try{
    await db.authenticate();
    await syncAndSeed();
    app.listen(PORT, () => console.log(`Connections backend listening on port ${PORT}`))
  }
  catch(err){
    console.log(err);
  }
}

init();
