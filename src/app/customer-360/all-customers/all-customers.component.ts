import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
customerForm!: FormGroup;
lastName: any;
selectedPrefix: any;
selectedSuffix: any;
selectedGender: any;
dateOfBirth: any;
email: any;
selectedLanguage: any;
spokenLanguage: any;
address: any;
zip: any;
mailingZip: any;
mailingAddress: any;
  agentId: any;

save() {
  const selectedPrefixValue = this.customerForm.get('selectedPrefix')!.value;
   
    const basicInformation =
    {
      firstName:this.customerForm.get('firstName')!.value,
      middleName:this.customerForm.get('middleName')!.value,
      lastName:this.customerForm.get('lastName')!.value,
      prefix:this.customerForm.get('selectedPrefix')!.value,
      suffix:this.customerForm.get('selectedSuffix')!.value,
      gender:this.customerForm.get('selectedGender')!.value,
      dateOfBirth:this.customerForm.get('dateOfBirth')!.value,
      email:this.customerForm.get('email')!.value,
      writtenLanguage:this.customerForm.get('selectedLanguage')!.value,
      spokenLanguage:this.customerForm.get('spokenLanguage')!.value,
      hearAboutUsFrom:this.customerForm.get('selectedAbout')!.value
    }
    const homeAddress = 
    {
      addressLine1:this.customerForm.get('address')!.value,
      zip:this.customerForm.get('zip')!.value,
      county:this.customerForm.get('county')!.value,
      countyName:'los',
      city:this.customerForm.get('city')!.value,
      state:this.customerForm.get('state')!.value
    }
    const mailingAddress = 
    {
      addressLine1:this.customerForm.get('mailingAddress')!.value,
      zip:this.customerForm.get('mailingZip')!.value,
      countyName:'los',
      county:this.customerForm.get('mailingCounty')!.value,      
      city:this.customerForm.get('mailingCity')!.value,
      state:this.customerForm.get('mailingState')!.value

    }    
    const contactInformation= [
        {
          phoneNo: "9810000000",
          phoneType: "Cell",
        },
        {
          phoneNo: "9810000001",
          phoneType: "Work",
        },
      ]
    const isSoa = this.customerForm.get('completeScope')!.value

    this.commonservice.addCustomer(this.agentId,basicInformation,homeAddress,mailingAddress,contactInformation,isSoa).subscribe(response => {
      console.log('response.data',response.data)
    })
}
quickQuote() {
  this.route.navigate(['quoting'])
}

  isDropdownOpen: boolean = false;
    output: any;
  showAddCustomerForm: boolean = false;
  firstName:any
  middleName:any
  selectedAbout:any

  
  constructor(private elementRef: ElementRef,    
     private commonservice: CommonService, 
     private fb: FormBuilder,
     public dialog: MatDialog,private route: Router) {
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
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      county: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],      
      mailingAddress: ['', Validators.required],
      mailingZip: ['', Validators.required],
      mailingCounty: ['', Validators.required],
      mailingCity: ['', Validators.required],
      mailingState: ['', Validators.required],
      selectedPrefix: ['', Validators.required],
      selectedSuffix: ['', Validators.required],
      selectedGender: ['', Validators.required],
      selectedLanguage: ['', Validators.required],
      formControlName: ['', Validators.required],
      selectedAbout: ['', Validators.required],
      spokenLanguage: ['', Validators.required],
      completeScope:['', Validators.required]
      // ... other form controls
    });
    console.log('this.firstName',this.firstName)
    this.agentId = sessionStorage.getItem('agentId')
    if(this.agentId) {    
    this.commonservice.viewCustomer(this.agentId).subscribe((response: any) => {
      if (response.status==true) {
        this.output =response.data
        
      } else {
        alert('User not found.');
      }
    });
  }
    


  }
  
}

