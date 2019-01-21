const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    nail: {
        type: Schema.Types.ObjectId,
        ref: 'Nail'
    }
});