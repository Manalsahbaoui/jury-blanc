import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  task: {  // Corrected field name from 'project' to 'task'
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Task", 
    required: true 
  },
  resourceName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Equipment', 'Software', 'Human', 'Other'] // Unification des langues
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  supplier: {
    type: String,
    required: true,
    trim: true
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;