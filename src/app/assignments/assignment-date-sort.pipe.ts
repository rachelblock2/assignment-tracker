import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { Assignment } from './assignment.model';

@Pipe({
  name: 'assignmentDateSort'
})
export class AssignmentDateSortPipe implements PipeTransform {
  transform(assignments: Assignment[], order = '', dueDate: Date){
  
      // Is there an array?
      if (!assignments || order === '' || !order) { 
          return assignments; 
        } // no array
      
        if (assignments.length <= 1) { 
            return assignments; 
    } // array with only one item
  
    if (!dueDate) { 
      if (order ==='asc') {
        return assignments.sort()
      } else {
        return assignments.sort().reverse();
      }
    } 
  
    // sort array
    return orderBy(assignments, [dueDate], [order]);
  }
}
// transform(value: any[], dueDate: Date): any {
//   return value.sort((a, b) => {
//     if ((a.dueDate) > (b.dueDate)) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }