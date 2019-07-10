var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    age:{
        type: Number,
        required: true
    },
    isFun:{
        type: Boolean,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

var Person = mongoose.model('Person', PersonSchema);

module.exports = {
    Person: Person
}

