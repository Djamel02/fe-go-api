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
    picture: new FormControl(null),
  });
  url: string | ArrayBuffer | null = null;

  constructor(
    private employeeService: EmployeeService,
    private diagRef: MatDialogRef<AddEmployeeComponent>
  ) {}

  ngOnInit(): void {}
  // Upload image and display it
  uploadImage(event: any) {
    const files = event?.target?.files;
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log('Only images are supported.');
      return;
    }

    const reader = new FileReader();
    const imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.addEmpForm.get('picture')?.setValue(files[0]);
    };
  }

  addEmployee() {
    const fd = new FormData();
    fd.append('name', this.addEmpForm.get('name')?.value);
    fd.append('phone', this.addEmpForm.get('phone')?.value);
    fd.append('picture', this.addEmpForm.get('picture')?.value);
    console.log(fd);
    this.employeeService.addNewEmployee(fd).subscribe(
      ({ data }) => {
        console.log(data);
        if (Number(data) > 0) this.diagRef.close();
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.message;
      }
    );
  }
}
