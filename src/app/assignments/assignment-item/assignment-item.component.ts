import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'assignment-tracker-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {
  @Input() assignment: Assignment;
  backgroundColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
