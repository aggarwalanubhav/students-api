import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ Add RouterModule here
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id?: number) {
    if (id === undefined) {
      console.error("Error: Student ID is undefined.");
      return;
    }

    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
