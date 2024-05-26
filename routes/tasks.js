const express = require('express');
const router = express.Router();

let tasks = []; // In-memory storage for tasks

// Middleware to make `tasks` available in the request object
router.use((req, res, next) => {
    req.tasks = tasks;
    next();
});

// Route to show the add task form
router.get('/add-task', (req, res) => {
    res.render('index', { showForm: true, tasks: req.tasks });
});

// Route to handle form submission
router.post('/addtask', (req, res) => {
    const newTask = {
        id: Date.now(), // Unique ID for each task
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
    };
    req.tasks.push(newTask);
    res.redirect('/');
});

// Route to show the edit task form
router.get('/edit-task/:id', (req, res) => {
    const task = req.tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.render('edit', { task: task });
    } else {
        res.redirect('/');
    }
});

// Route to handle task updates
router.post('/update-task/:id', (req, res) => {
    const taskIndex = req.tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        req.tasks[taskIndex] = {
            id: req.tasks[taskIndex].id, // Retain the original ID
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        };
    }
    res.redirect('/');
});

// Route to mark a task as done
router.post('/mark-done/:id', (req, res) => {
    const task = req.tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.status = 'completed';
    }
    res.redirect('/');
});

// Route to delete a task
router.post('/delete-task/:id', (req, res) => {
    tasks = req.tasks.filter(t => t.id !== parseInt(req.params.id));
    req.tasks = tasks; // Update the req.tasks reference
    res.redirect('/');
});

module.exports = router;
