const router = require('express').Router();
const {connectClient} = require('../db/postgres');
const Todo = require('../src/todoModel');

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.render('todos', {
            todos,
            message: req.flash('message')
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//store
router.post('/', async (req, res) => {
    console.log(req.body);

    try {
        const todo = await Todo.create({title: req.body.title, completed: req.body.completed == 'on' ? true : false});
        req.flash('message', '¡Tarea creada exitosamente!');
        res.redirect('./todospanel');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/searchById', async (req, res) => {
    try {
        const searchId = parseInt(req.query.searchById, 10);

        if (isNaN(searchId)) {
            return res.status(400).json({ message: 'ID inválido. Por favor, introduce un número entero.' });
        }

        const todo = await Todo.findOne({ where: { id: searchId } });

        if (todo) {
            res.json({ todo });
        } else {
            res.json({ message: 'No se encontró ninguna tarea con ese ID.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//show
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.render('./todospanel', { todo });
        } else {
            res.status(404).send('Tarea no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar una tarea por ID
router.post('/:id', async (req, res) => {
    try {
        const [updated] = await Todo.update({
            title: req.body.title,
            completed: req.body.completed === 'on' ? true : false
        }, {
            where: { id: req.params.id }
        });

        if (updated) {
            req.flash('message', 'Tarea actualizada exitosamente');
            res.redirect('/api/v1/todospanel');
        } else {
            res.status(404).send('Tarea no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar una tarea por ID
router.post('/:id/delete', async (req, res) => {
    try {
        const deleted = await Todo.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            req.flash('message', 'Tarea eliminada exitosamente');
            res.redirect('/api/v1/todospanel');
        } else {
            res.status(404).send('Tarea no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);




// GET: Mostrar formulario de edición
router.get('/:id/edit', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.render('todos/edit_todo', { todo });
        } else {
            res.status(404).send('Tarea no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;