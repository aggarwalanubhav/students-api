import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentFormComponent } from './students/student-form/student-form.component';

export const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];

// Export the RouterModule
export const AppRoutingModule = RouterModule.forRoot(routes);
