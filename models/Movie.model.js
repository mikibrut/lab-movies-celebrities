const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: 'unknown'
    },
    plot: String,
    cast: {
        type: [Schema.Types.ObjectId],
        ref: 'Celebrity'
    }, 
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;