import {Schema, model} from 'mongoose'

const schemas = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    refreshToken: {
        type: String,
        default: ''
    },
    emailToken:{
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
    }
});

const User = model('User', schemas);
export default User;
