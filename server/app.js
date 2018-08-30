const express = require('express');
const morgan = require('morgan');
const body = require('body-parser');
const app = express();
var resultObject = {};
const data = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

// add your code here
app.use(morgan('dev'));
app.use(body.json());
app.get('/', (req, res) =>{
    res.json({
        status: 'ok',
    });
});

app.get('/api/TodoItems/', (req, res)=>{
    res.status(200).json(data)
});

app.get('/api/TodoItems/:number', (req, res) =>{
    if (req.params.number < data.length){
        for (let i in data){
            if (data[i].todoItemId == req.params.number){
                resultObject = data[i];
            }
        }
    }
    res.status(200).json(resultObject);
});

app.post('/api/ToDoItems/', (req, res) => {
    var id = 0;
     const newToDoItem = {
        todoItemId: id,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed
    }
    data.push(newToDoItem);
    id++;

    res.status(201).send(newToDoItem);
});

app.delete("/api/TodoItems/:number", (req, res) => {
    res.status(200).send(data[req.params.number]);
    data.splice(req.params.number, 1);
});

module.exports = app;