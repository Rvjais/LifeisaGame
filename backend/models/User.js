const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: String,
    baseline: { type: Number, default: 50 },
    goals: { type: Array, default: [] },
    history: { type: Array, default: [] },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
