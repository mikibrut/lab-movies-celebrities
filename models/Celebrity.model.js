//  Add your code here

const mongoose = require('mongoose');
const { Schema } = mongoose;

const celebritySchema = new Schema ({
    name : {
        type: String,
        required: [true, 'You must at least tell me their name']
    },
    occupation: {
        type: String,
        default: 'Unknown'
    },
    catchPhrase: String
}, {
    timestamps: true
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);
module.exports = Celebrity;