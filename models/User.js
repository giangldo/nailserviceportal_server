const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

//
const ROLES = ['Admin', 'Owner', 'Manager', 'Employee'];
const TYPES = ['Internal', 'External'];

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'Owner'
    },
    type: {
        type: String,
        default: 'Internal'
    },
    active: {
        type: Boolean,
        default: false
    },
    salon: {
        type: ObjectId,
        ref: 'Salon'
    }
});

userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.setRole = function(role) {
    
    if(ROLES.indexOf(role) > -1) {
        if (role == 'Admin' && this.role !== 'Admin') {
            return this.role;
        }
        return role;
    }
    return this.role;
}

userSchema.methods.setType = function(type) {
    
    if(TYPES.indexOf(type) > -1) {
        return type;
    }
    return this.type;
}

module.exports.User = mongoose.model('User', userSchema);
module.exports.Helper = {
    validate: () => {

    }
}