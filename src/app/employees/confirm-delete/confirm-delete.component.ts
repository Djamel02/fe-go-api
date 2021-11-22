import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  msgError: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public diagRef: MatDialogRef<ConfirmDeleteComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}

  deleteEmp() {
    this.employeeService.deleteEmployee(Number(this.data?.['id'])).subscribe(
      (res: number) => {
        if (res > 0) {
          this.diagRef.close();
        }
      },
      (err: HttpErrorResponse) => {
        this.msgError = err.message;
      }
    );
  }
}
