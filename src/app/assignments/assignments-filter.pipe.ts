import { Pipe, PipeTransform } from '@angular/core';
import { Assignment } from './assignment.model';

@Pipe({
  name: 'AssignmentsFilter'
})
export class AssignmentsFilterPipe implements PipeTransform {

  transform(assignments: Assignment[], term: string): any {
    let filteredAssignments: Assignment[] = [];

    if (term && term.length > 0) {
      filteredAssignments = assignments.filter(
        (assignment: Assignment) => assignment.assignmentName.toLowerCase().includes(term.toLowerCase())
      )
    }

    if (filteredAssignments.length < 1) {
      return assignments;
    }

    return filteredAssignments;
  }

}
