let mongoose = require('mongoose');

let taskSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskName: String,
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate: Date,
    taskStatus: {
        type: String,
        validate: {
            validator: function(value){
                return value == 'Complete' || value == 'InProgress';
            },
            message: 'either InProgress or Complete'
        }
    },
    taskDescription: String


}); 

module.exports= mongoose.model('Task',taskSchema);
