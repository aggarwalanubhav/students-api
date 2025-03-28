import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Student {
  id?: number;
  name: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // Check if there's an ID in the URL (for edit mode)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.studentId = +id;
        this.loadStudent(this.studentId);
      }
    });
  }

  loadStudent(id: number) {
    this.studentService.getById(id).subscribe(student => {
      this.studentForm.patchValue(student);
    });
  }

  submitForm() {
    const studentData: Student = this.studentForm.value;

    if (this.studentId) {
      // Update existing student
      this.studentService.update(this.studentId, studentData).subscribe(() => {
        alert('Student updated successfully');
        this.router.navigate(['/students']);
      });
    } else {
      // Add new student
      this.studentService.create(studentData).subscribe(() => {
        alert('Student added successfully');
        this.router.navigate(['/students']);
      });
    }
  }
}
