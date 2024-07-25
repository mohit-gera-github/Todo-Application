const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB 
mongoose.connect('mongodb+srv://mohitgera5510:mohitgera123@cluster0.hblgaw0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
}).then(() => {
    console.log('Connected to MongoDB ');
}).catch((error) => {
    console.error('Error connecting to MongoDB :', error);
});


//  Todo schema and model
const TodoSchema = new mongoose.Schema({
    text: String,
});

const Todo = mongoose.model('Todo', TodoSchema);


// Routes
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo' });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});