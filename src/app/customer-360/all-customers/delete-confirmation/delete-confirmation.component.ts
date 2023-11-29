import {Component, Inject, OnInit} from '@angular/core';

import {CommonService} from "../../../services/common.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { AllCustomersComponent } from '../all-customers.component';


@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
buttons=false
  constructor(private dialog : MatDialog,
    private route: Router,
    private commonservice: CommonService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true)
  }

  continue() {
    const customerId =sessionStorage.getItem('customerId')
    const agentId =sessionStorage.getItem('agentId')
    console.log('customerId',customerId,agentId) 
    if(customerId && agentId){
      this.commonservice.deleteCustomer(customerId,agentId).subscribe((response: any) => {

        if (response.status==true) {
          console.log('response',response)           
          location.reload();
          this.dialogRef.close(true)
        } 
       
      });
    }
    
  }
}
