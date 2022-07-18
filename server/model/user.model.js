const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        collection: 'user-data'
    }
)

const model = mongoose.model('UserData', User);

module.exports = model;