import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userForm !: FormGroup;
  actionBtn : string = "Save";
  hide = true;

  constructor(private formBuilder : FormBuilder,
     private api : ApiService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<UserDashboardComponent>) { }

  ngOnInit(): void {
    this.userForm= this.formBuilder.group({
      UserID : ['',Validators.required],
      EmailID : ['',Validators.required],
      FirstName: ['',Validators.required],
      LastName: ['',Validators.required],
      mobile:['',Validators.required],
      password:['',Validators.required],
      experience:['',Validators.required],
      address:['',Validators.required],
      Education:['',Validators.required],
      cvLink:['',Validators.required],
      

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.userForm.controls['UserID'].setValue(this.editData.UserID);
      this.userForm.controls['EmailID'].setValue(this.editData.EmailID);
      this.userForm.controls['FirstName'].setValue(this.editData.FirstName);
      this.userForm.controls['LastName'].setValue(this.editData.LastName);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['experience'].setValue(this.editData.experience);
      this.userForm.controls['address'].setValue(this.editData.address);
      this.userForm.controls['cvLink'].setValue(this.editData.cvLink);
      this.userForm.controls['Education'].setValue(this.editData.Education);
      this.userForm.controls['mobile'].setValue(this.editData.mobile);

    }
  }
  addUser(){
    console.log(this.userForm.value);
    if(!this.editData){
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next:(res)=>{
            alert("User added successfully");
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the user")
          }
        })
      }
    }else{
      this.updateUser()
    }
  }
  updateUser(){
    this.api.putUser(this.userForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated successfully");
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record ")
      }

    })
  }

}
