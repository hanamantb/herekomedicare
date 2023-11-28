import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
@Component({
  selector: 'all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
quickQuote() {
  this.route.navigate(['quoting'])
}
  isDropdownOpen: boolean = false;
    output: any;
  showAddCustomerForm: boolean = false;

  
  constructor(private elementRef: ElementRef, private commonservice: CommonService, public dialog: MatDialog,private route: Router) {
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openConfirmationPopup() {
    this.dialog.open(DeleteConfirmationComponent, { width: '600px', panelClass: ['alert-popup', 'alert-warning'] })
  }
  addCustomerForm() {
    this.showAddCustomerForm = !this.showAddCustomerForm;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  ngOnInit(): void {
    const agentId = sessionStorage.getItem('agentId')
    if(agentId) {    
    this.commonservice.viewCustomer(agentId).subscribe((response: any) => {
      if (response.status==false) {
        this.output =[
          {
              "customerId": "494412986",
              "agentId": "david",
              "customerName": "Jai 2 kumar",
              "zipCode": "32003",
              "county": "04013",
              "countyName": "Maricopa",
              "city": "",
              "state": "AZ",
              "soaStatus": "",
              "dateOfBirth": "06/25/2023",
              "phone": [
                  {
                      "phoneNo": "9810000000",
                      "phoneType": "Cell"
                  },
                  {
                      "phoneNo": "9810000001",
                      "phoneType": "Work"
                  }
              ],
              "status": "",
              "createdDate": "11/27/2023"
          },
          {
              "customerId": "298395457",
              "agentId": "david",
              "customerName": "Ravi kumar",
              "zipCode": "32003",
              "county": "04013",
              "countyName": "Maricopa",
              "city": "",
              "state": "AZ",
              "soaStatus": "",
              "dateOfBirth": "06/25/2023",
              "phone": [
                  {
                      "phoneNo": "9810000000",
                      "phoneType": "Cell"
                  },
                  {
                      "phoneNo": "9810000001",
                      "phoneType": "Work"
                  }
              ],
              "status": "",
              "createdDate": "11/27/2023"
          },
          {
              "customerId": "950641944",
              "agentId": "david",
              "customerName": "ankish kumar",
              "zipCode": "32003",
              "county": "04013",
              "countyName": "Maricopa",
              "city": "",
              "state": "AZ",
              "soaStatus": "",
              "dateOfBirth": "06/25/2023",
              "phone": [
                  {
                      "phoneNo": "9810000000",
                      "phoneType": "Cell"
                  },
                  {
                      "phoneNo": "9810000001",
                      "phoneType": "Work"
                  }
              ],
              "status": "",
              "createdDate": "11/27/2023"
          }
      ]
        console.log('this.output',this.output)
        
      } else {
        alert('User not found.');
      }
    });
  }
    


  }
  
}

