import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentEditComponent } from './assignments/assignment-edit/assignment-edit.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/assignments', pathMatch: 'full'},
  { path: 'assignments', component: AssignmentsComponent, children: [
    { path: 'new', component: AssignmentEditComponent },
    { path: ':id', component: AssignmentDetailComponent},
    { path: ':id/edit', component: AssignmentEditComponent}
  ]}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
