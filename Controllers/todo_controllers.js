const Todo = require('../Models/todoModel');

// Create todo controller
exports.create_todo = async (req, res) => {
    try {
        const {username, todotitle, status, category} = req.body;
        const newtodo = new Todo({
            username,
            todotitle,
            status, 
            category,
        });
        const savetodo = await newtodo.save();
        res.status(200).json(savetodo);

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

// Get todo controller
exports.get_todo = async (req, res) => {
    try {
        const data = await Todo.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get All todo controller
exports.getAll_todo = async (req, res) => {
    try {
        // sorting data using createdAT field in descending order
        const data = await Todo.find().sort({createdAt: '-1'});
        const filters = req.query;
        const filteredCategory = data.filter(category => {
            let isValid = true;
            for (key in filters) {
                console.log(key, category[key], filters[key]);
                isValid = isValid && category[key] == filters[key];
            }
            return isValid;
        })
        res.send(filteredCategory);
        // res.status(200).json(data);
    } catch (err) {
        res.json.status(500).json(err);
        console.log(err);
    }
}

// Update todo controller
exports.update_todo = async (req, res) => {
    try {
        const user = await Todo.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Delete todo controller
exports.delete_todo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json("Todo has been deleted");
    } catch(err) {
        return res.status(500).json(err);
    }
}
