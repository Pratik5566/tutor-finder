const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^\S+@\S+\.\S+$/ // Validate email format
    },
    phone: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    isTutor: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tutorID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tutor'
            // This specifies the referenced model
        }]
});

userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
// Create Model
const User = mongoose.model('User', userSchema);

module.exports = User;
