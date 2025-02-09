const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create Schema
const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: 0
    },
    subject: [{
        type: [String],
        default:""
        // required: true
    }],
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        // default:""
        
    },
    location: {
        type: String,
        default:""
    },
    pincode: {
        type: Number,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    state: {
        type: String,
        default:""
    },
    offlineClasses: {
        type: Boolean,
        default:false
    },
    onlineClasses: {
        type: Boolean,
        default:false
        
    },
    atMyHome: {
        type: Boolean,
        default:false
        
    },
    atTheirHome: {
        type: Boolean,
        default:false
        
    },
    board: [{
        type: String,
        default:""

    }],
    isTutor: {
        type:Boolean,
        default: true
    },
    Class: [{
        type: String,
        default:""
    }],
});

tutorSchema.index({ email: 1 }, { unique: true });

// Hash password before saving to database
tutorSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

tutorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
// Create Model
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
