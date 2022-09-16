import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './../service/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css']
})
export class EmpDetailDialogComponent implements OnInit {

  addForm: FormGroup | any;
  button1: string = "Save"
  constructor(private router: Router, private formbuilder: FormBuilder,
    private http: HttpClient, private api: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<EmpDetailDialogComponent>) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    if (this.editData) {
      this.button1 = "Update";
      this.addForm.controls['email'].setValue(this.editData.email);
      this.addForm.controls['name'].setValue(this.editData.name);
    }
  }
  adddetail() {
    if (!this.editData) {
      if (this.addForm.valid) {
        this.api.postEmp(this.addForm.value)
          .subscribe({
            next: (res) => {
              alert("details added successfully");
              this.addForm.reset();
              this.dialogref.close();
            },
            error: () => {
              alert("Something went wrong ")
            }
          })
      }
    } else {
      this.updatedetail();
    }
  }
  updatedetail() {
    this.api.putEmp(this.addForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("details updated successfully");
          this.addForm.reset();
          this.dialogref.close('update');
        },
        error: () => {
          alert("Something went wrong ")
        }
      })
  }
}
