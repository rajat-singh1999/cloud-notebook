const mongoose = require('mongoose');
const {Schema} = mongoose

const NotesSchema = new Schema({
    user:{ // this is equivalent to a primary key in SQL
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user' // reference to the model I want to connect(as in hypothetically connect)
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);