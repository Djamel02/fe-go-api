import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from 'src/app/models/employee.interface';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: [
    './edit-employee.component.scss',
    '../add-employee/add-employee.component.scss',
  ],
})
export class EditEmployeeComponent implements OnInit {
  errMessage: string = '';
  editEmpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private diagRef: MatDialogRef<EditEmployeeComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService
      .getEmployeeById(Number(this.data?.['id']))
      .subscribe((res: IEmployee) => {
        this.editEmpForm.setValue({
          name: res.name,
          phone: res.phone,
        });
      });
  }

  EditEmployee() {
    this.employeeService
      .editEmployee(Number(this.data?.['id']), this.editEmpForm.value)
      .subscribe(
        (res: IEmployee) => {
          this.diagRef.close();
        },
        (err: HttpErrorResponse) => {
          this.errMessage = err.message;
        }
      );
  }
}
