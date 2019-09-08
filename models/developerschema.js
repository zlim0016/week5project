let mongoose = require('mongoose');

let developerSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        required: true,
        validate: {
            validator: function (value){
                return value == 'BEGINNER' || value == 'EXPERT'
            },
            message: 'either BEGINNER or EXPERT, and it must be in CAP.'
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        Unit: String

    }







});

module.exports= mongoose.model('Developer',developerSchema);
