import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'assignment-tracker-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit, OnDestroy {
  assignments: Assignment[] = [];
  subscription: Subscription;
  searchText = 'Enter an assignment name';
  term: string;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.subscription = this.assignmentService.assignmentListChangedEvent.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    )
    this.assignmentService.getAssignments();
  }

  search(value:string) {
    this.term = value;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
