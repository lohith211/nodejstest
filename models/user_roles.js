const mongoose = require('mongoose');
const crypto = require('crypto');
let uuidv1 = require('uuidv1');

const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Roles: {
            type: String,
            role: { type: String, enum: ['admin', 'others'], required: true }
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('User_Roles', userSchema);
