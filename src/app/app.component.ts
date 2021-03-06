import { Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'userInfo';

  displayedColumns: string[] = ['UserID', 'EmailID', 'FirstName', 'LastName','mobile','password','experience','address','cvLink','Education','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog.open(UserDashboardComponent, {
      width:'30%'     
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
      this.getAllUsers();
      }
    })
  }

  getAllUsers(){
    this.api.getUser()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching the records!!")
      }
    })

  }
  editUser(row : any){
    this.dialog.open(UserDashboardComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
      this.getAllUsers();
      }
    })
  }
  deleteUser(id : number){
    this.api.deleteUser(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted succesfully.");
        this.getAllUsers();
      },
      error:()=>{
        alert("Error while deleting the user!!")
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

}
