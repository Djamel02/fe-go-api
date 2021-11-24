import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee } from '../models/employee.interface';
import { Res } from '../models/response.interface';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  displayedColumns: Array<string> = ['index', 'name', 'phone', 'edit_delete'];
  dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private employeesService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeesList();
  }

  private getEmployeesList() {
    this.employeesService.getEmployeesList().subscribe(({ data }) => {
      this.dataSource = new MatTableDataSource(data as Array<IEmployee>);
    });
  }

  openAddEmployeeDiag() {
    this.dialog
      .open(AddEmployeeComponent)
      .afterClosed()
      .subscribe(() => this.getEmployeesList());
  }

  openEditEmployeeDiag(id: number) {
    this.dialog
      .open(EditEmployeeComponent, {
        data: {
          id,
        },
      })
      .afterClosed()
      .subscribe(() => this.getEmployeesList());
  }

  openConfirmDeleteDiag(id: number) {
    this.dialog
      .open(ConfirmDeleteComponent, {
        data: {
          id,
        },
      })
      .afterClosed()
      .subscribe(() => this.getEmployeesList());
  }
}
