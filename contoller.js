const User = require('./models');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.rollnumber) {
        return res.status(400).send({
            message: "user rollnumber can not be empty"
        });
    }

    // Create a user
    const user = new User({
        name: req.body.name || "Untitled user", 
        age: req.body.age,
        rollnumber: req.body.rollnumber
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.rollnumber)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.rollnumber
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.rollnumber
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.rollnumber
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.rollnumber) {
        return res.status(400).send({
            message: "user rollnumber can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.rollnumber, {
        name: req.body.name || "Untitled user",
        age: req.body.age
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with rollnumber " + req.params.rollnumber
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with rollnumber " + req.params.rollnumber
            });                
        }
        return res.status(500).send({
            message: "Error updating user with rollnumber " + req.params.rollnumber
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.rollnumber)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with rollnumber " + req.params.rollnumber
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with rollnumber " + req.params.rollnumber
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with rollnumber " + req.params.rollnumber
        });
    });
};
