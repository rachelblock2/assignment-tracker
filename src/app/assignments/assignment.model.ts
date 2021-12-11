export class Assignment {
    constructor(
        public id: string,
        public courseName: string, 
        public assignmentName: string, 
        public dueDate: Date,
        public priority: string,
        public color: string,
        public notes: string) {}
}