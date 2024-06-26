const router = require('express').Router()
const client = require('../db/postgres')
//const sequelize = require('../db/sequalize') 
const Todo = require('../src/todoModel')


//index
router.get('/', async (req, res) => {
try {
    const todos = await Todo.findAll()
    res.json(todos);
} catch (error) {
    res.status(500).send('error.message');
}


   /* try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    //console.log('GET /api/v1/todos')
    //obtener todos los "todos" de la BD
    await client.connect()
    const result = await client.query('SELECT * FROM todos')
    console.log(result)
    await client.end()
    res.json(result.rows)*/
});

//store
router.post('/',async(req,res)=> {
    const Client = await client.connectClient();
    const result = await
Client.query('INSERT INTO todos (title, completed) VALUES ($1, $2)'
, [req.body.title, req.body.completed])
console.log(result)
await Client.end()
res.status(201).send('Todo created')
})

//show
router.get('/:id',async (req, res) => {
    const Client = await client.connectClient();
    const result = await
    Client.query('SELECT * FROM todos WHERE id = $1', [req.params.id])
    console.log(result)
    await Client.end()
    res.json(result.rows)
    console.log('GET /api/v1/todos/:id')
})

//Update
router.put('/:id',async (req,res)=> {
    await client.connect()
    const result = await
    client.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3'
    , [req.body.title, req.body.completed, req.params.id])
    console.log(result)
    await client.end()
    res.status(201).send('Todo updated')
    console.log('PUT /api/v1/todos/:id')
})

//Delete
/*router.delete('/:id', async(req,res)=> {
    await client.connect()
    const result = await
    client.query('DELETE FROM todos WHERE id = $1', [req.params.id])
    console.log(result)
    await client.end()
    res.status(201).send('Todo deleted')
    console.log('DELETE /api/v1/todos/:id')
})*/

module.exports = router