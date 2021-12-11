const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
   id: { type: String, required: true },
   courseName: { type: String, required: true },
   assignmentName: { type: String, required: true },
   dueDate: { type: Date, required: true },
   priority: { type: String, required: true },
   color: { type: String },
   notes: { type: String }
});

module.exports = mongoose.model('Assignment', assignmentSchema);