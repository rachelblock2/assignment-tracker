import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Assignment } from './assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignmentListChangedEvent = new Subject<Assignment[]>();
  assignments: Assignment[] = [];

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.assignments.sort((a, b) => (a.dueDate > b.dueDate) ? 1 :((b.dueDate > a.dueDate) ? -1 : 0));
    this.assignmentListChangedEvent.next(this.assignments.slice());
  }

  getAssignments() {
    this.http.get<{assignments: Assignment[]}>('http://localhost:3000/assignments/')
    .subscribe((response) => {
      this.assignments = response.assignments;
      this.sortAndSend();
    }, (error: any) => {
      console.log(error.message);
    })
  }

  getAssignment(id: string) {
    return this.http.get<{message: string, assignment: Assignment}>('http://localhost:3000/assignments/' + id)
  }

  addAssignment(assignment: Assignment) {
    if (!assignment) {
      return
    }

    // make sure id of new Assignment is empty
    assignment.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, assignment: Assignment }>('http://localhost:3000/assignments/',
      assignment,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new assignment to assignments
          assignment.id = responseData.assignment.id;
          this.assignments.push(responseData.assignment);
          this.sortAndSend();
        }
      )
  }

  updateAssignment(originalAssignment: Assignment, newAssignment: Assignment) {
    if (!originalAssignment || !newAssignment) {
      return
    }

    console.log(originalAssignment);
    console.log(newAssignment);

    const position = this.assignments.findIndex(a => a.id === originalAssignment.id);
    if (position < 0) {
      return
    };

    // Set id of the new, updated Assignment to the id of the old Assignment
    newAssignment.id = originalAssignment.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/assignments/' + originalAssignment.id,
      newAssignment, { headers: headers })
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.assignments[position] = newAssignment;
          console.log(newAssignment);
          this.sortAndSend();
        }
      );
  }

  deleteAssignment(assignment: Assignment) {
    if(!assignment) {
      return;
    }

    const position = this.assignments.findIndex(a => a.id === assignment.id);
    if (position < 0){
      return;
    }

     // delete from database
     this.http.delete('http://localhost:3000/assignments/' + assignment.id)
     .subscribe(
       (responseData) => {
         this.assignments.splice(position, 1);
         this.sortAndSend();
       }
     );
  }

}
