import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  errMessage: string = '';
  addEmpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    private employeeService: EmployeeService,
    private diagRef: MatDialogRef<AddEmployeeComponent>
  ) {}

  ngOnInit(): void {}

  addEmployee() {
    this.employeeService.addNewEmployee(this.addEmpForm.value).subscribe(
      (res: number) => {
        this.diagRef.close();
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.message;
      }
    );
  }
}
