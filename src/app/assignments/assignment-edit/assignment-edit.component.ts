import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'assignment-tracker-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css']
})
export class AssignmentEditComponent implements OnInit {
  assignment: Assignment;
  originalAssignment: Assignment;
  editMode: boolean = false;
  signupForm: FormGroup;
  priorities = ['High', 'Medium', 'Low'];

  id: string;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'courseName': new FormControl(null, [Validators.required]),
      'assignmentName': new FormControl(null, [Validators.required]),
      'dueDate': new FormControl(null, [Validators.required]),
      'priority': new FormControl("Medium", [Validators.required]),
      'color': new FormControl(null),
      'notes': new FormControl(null)
    });
    
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (!this.id) {
          this.editMode = false;
          return
        }

        this.assignmentService.getAssignment(this.id)
        .subscribe(assignmentData => {
          this.originalAssignment = assignmentData.assignment;
  
          if (!this.originalAssignment) {
            return
          }
          
          this.editMode = true;
          this.assignment = JSON.parse(JSON.stringify(this.originalAssignment));
          
          this.signupForm.setValue({'courseName': this.assignment?.courseName, 
          'assignmentName': this.assignment?.assignmentName,
          'dueDate': formatDate(this.assignment.dueDate, 'yyyy-MM-dd', 'en'),
          'priority': this.assignment?.priority,
          'color': this.assignment?.color,
          'notes': this.assignment?.notes})
        });
      }
    );

    
    // this.signupForm.courseName.setValue();
  } 

  onSubmit({ value }: { value: Assignment }) {
    // let value = form.value;
    let newAssignment = new Assignment('', value.courseName, value.assignmentName, value.dueDate, value.priority, value.color, value.notes);
    console.log(newAssignment);
    console.log(this.editMode);
    
    if (this.editMode) {
      this.assignmentService.updateAssignment(this.originalAssignment, newAssignment);
    } else {
      this.assignmentService.addAssignment(newAssignment);
    }

    this.router.navigate(['/assignments']);
  }

  onCancel() {
    this.router.navigate(['/assignments']);
  }

}
