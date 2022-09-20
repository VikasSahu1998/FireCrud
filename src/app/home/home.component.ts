import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { EmployeeService } from '../service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: EmployeeService) { }

  ngOnInit(): void {
    this.getdetail();
  }
  openDialog() {
    this.dialog.open(EmpDetailDialogComponent, {
      width: '33%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getdetail();
      }
    })
  }
  getdetail() {
    console.log();
    this.api.getEmp()
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource();
          this.getdetail();
        },
        error: (err) => {
          alert("Something went wrong ")
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editdetail(row: any) {
    this.dialog.open(EmpDetailDialogComponent, {
      width: '33%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getdetail();
      }
    })
  }

  deletedetail(id: number) {
    this.api.deleteEmp(id)
      .subscribe({
        next: (res) => {
          alert("details deleted successfully");
          this.getdetail();
        },
        error: () => {
          alert("Something went wrong ")
        }
      })
  }

}
