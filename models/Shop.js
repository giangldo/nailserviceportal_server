const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    },
    phone: {
        type: String
    },
    employees: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    menu: {
        type: ObjectId,
        ref: 'Menu'
    },
    salon: {
        type: ObjectId,
        ref: 'Salon'
    }
});

module.exports.Shop = mongoose.model('Shop', shopSchema);