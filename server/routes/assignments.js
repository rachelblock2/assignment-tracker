let express = require('express');
let router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Assignment = require('../models/assignment');

router.get('/', (req, res, next) => {
    Assignment.find()
        .then(assignments => {
            res.status(200).json({
                assignments: assignments
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred HERE',
                error: error
              });
        })
 });

 router.get('/:id', (req, res, next) => {
  Assignment.findOne({"id": req.params.id})
      .then(assignment => {
          res.status(200).json({
              message: 'Successfully found assignment!',
              assignment: assignment
          });
      })
      .catch(error => {
          res.status(500).json({
              message: 'An error occurred',
              error: error
            });
      })
});

 router.post('/', (req, res, next) => {
    const maxAssignmentId = sequenceGenerator.nextId("assignments");
    console.log(maxAssignmentId);
  
    const assignment = new Assignment({
      id: maxAssignmentId,
      courseName: req.body.courseName,
      assignmentName: req.body.assignmentName,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      color: req.body.color,
      notes: req.body.notes
    });
  
    assignment.save()
      .then(createdAssignment => {
        res.status(201).json({
          message: 'Assignment added successfully',
          assignment: createdAssignment
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  router.put('/:id', (req, res, next) => {
    Assignment.findOne({ id: req.params.id })
      .then(assignment => {
        assignment.courseName = req.body.courseName;
        assignment.assignmentName = req.body.assignmentName;
        assignment.dueDate = req.body.dueDate;
        assignment.priority = req.body.priority;
        assignment.color = req.body.color;
        assignment.notes = req.body.notes;
  
        Assignment.updateOne({ id: req.params.id }, assignment)
          .then(result => {
            res.status(204).json({
              message: 'Assignment updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Assignment not found.',
          error: { assignment: 'Assignment not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Assignment.findOne({ id: req.params.id })
      .then(assignment => {
        Assignment.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              assignment: "Assignment deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Assignment not found.',
          error: { assignment: 'Assignment not found'}
        });
      });
  });

module.exports = router;