const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse POST requests
app.use(express.urlencoded({ extended: true }));

// Import the tasks router
const tasksRouter = require('./routes/tasks');

// Use the tasks router for all routes starting with '/'
app.use('/', tasksRouter);

// Route for the homepage
app.get('/', (req, res) => {
    // Get the tasks from the middleware
    const tasks = req.tasks || [];
    res.render('index', { showForm: false, tasks: tasks });
});

// Start the server
const port = 3002; // Change this to a different port if needed
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
