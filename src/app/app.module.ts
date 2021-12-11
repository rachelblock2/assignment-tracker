import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentEditComponent } from './assignments/assignment-edit/assignment-edit.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AssignmentItemComponent } from './assignments/assignment-item/assignment-item.component';
import { AssignmentListComponent } from './assignments/assignment-list/assignment-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignmentsFilterPipe } from './assignments/assignments-filter.pipe';
import { AssignmentDateSortPipe } from './assignments/assignment-date-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AssignmentsComponent,
    AssignmentEditComponent,
    AssignmentDetailComponent,
    AssignmentItemComponent,
    AssignmentListComponent,
    AssignmentsFilterPipe,
    AssignmentDateSortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
