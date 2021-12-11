import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'assignment-tracker-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignment: Assignment;
  id: string;
  latest_date: string;
  
  constructor(private assignmentService: AssignmentService,
    private router: Router, private route: ActivatedRoute,
    private datepipe: DatePipe) { }
    
    ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.assignmentService.getAssignment(this.id)
          .subscribe(assignmentData => {
            this.assignment = assignmentData.assignment;
            this.latest_date = this.datepipe.transform(this.assignment.dueDate, 'MM-dd-yyyy');
          });
      }
    );
  }

  onDelete() {
    this.assignmentService.deleteAssignment(this.assignment);
    this.router.navigate(['/assignments']);
  }

}
