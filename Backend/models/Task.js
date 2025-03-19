const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['En cours', 'Terminé', 'En attente'], default: 'En attente' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

// testhere