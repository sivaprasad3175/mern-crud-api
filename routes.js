const express = require("express");
const userModel = require("./models");
const app = express();



const users = require('./contoller');

// Create a new Note
app.post('/users', users.create);

// Retrieve all users
app.get('/users', users.findAll);

// Retrieve a single Note with noteId
app.get('/users/:rollnumber', users.findOne);

// Update a Note with noteId
app.put('/users/:rollnumber', users.update);

// Delete a Note with noteId
app.delete('/users/:rollnumber', users.delete);



module.exports = app;
