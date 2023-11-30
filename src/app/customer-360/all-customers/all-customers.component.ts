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
  selectedCountie: any;
  couties: any;
cancel() {
  this.showAddCustomerForm = !this.showAddCustomerForm;
}
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
  phone: any;
  isMailingAddressSame: boolean = false;
  addresses!: { addressLine1: any; zip: any; countyName: string; county: any; city: any; state: any; };

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
    const values = this.customerForm.get('county')!.value;
    console.log
    const homeAddress = 
    {
      addressLine1:this.customerForm.get('address')!.value,
      zip:this.customerForm.get('zip')!.value,
      county:values.fips,
      countyName:values.name,
      city:this.customerForm.get('city')!.value,
      state:values.state
    }
    
    if(this.isMailingAddressSame){
      this.addresses = 
      {
        addressLine1:homeAddress.addressLine1,
      zip:homeAddress.zip,
      county:homeAddress.county,
      countyName:homeAddress.countyName,
      city:homeAddress.city,
      state:homeAddress.state,
  
      } 
    }else{
      const values = this.customerForm.get('mailingCounty')!.value;
       this.addresses = 
      {
        addressLine1:this.customerForm.get('mailingAddress')!.value,
        zip:this.customerForm.get('mailingZip')!.value,
        county:values.fips,
        countyName:values.name,      
        city:this.customerForm.get('mailingCity')!.value,
        state:values.state
  
      } 
    }
       
    const contactInformation= [
        {
          phoneNo: this.customerForm.get('phone1')!.value,
          phoneType: this.customerForm.get('phoneType1')!.value,
        },
        {
          phoneNo: this.customerForm.get('phone1')!.value,
          phoneType: this.customerForm.get('phoneType2')!.value,
        },
      ]
    const isSoa = this.customerForm.get('completeScope')!.value

    this.commonservice.addCustomer(this.agentId,basicInformation,homeAddress,this.addresses,contactInformation,isSoa).subscribe(response => {
      console.log('response.data',response.data)
      this.commonservice.viewCustomer(this.agentId).subscribe((response: any) => {
        if (response.status==true) {
          this.output =response.data 
          this.phone = response.data.phone 
          this.showAddCustomerForm = !this.showAddCustomerForm; 
        }         
        this.customerForm.reset();
      });
    })
}
inputCounties(event: any) {
  if (event.target.value.length === 5) {
    console.log('event', event.target.value)
    this.selectedCountie = event.target.value
    this.selectedCountie = []
    this.couties = []
    this.getCounties(event.target.value)
  } else {
    this.couties = []
    this.selectedCountie = []
    console.log('Not valid')
  }
}
getCounties(zip: any) {
  this.selectedCountie=[]
  this.couties=[]
  this.commonservice.getCounties(zip).subscribe(response => {
    this.couties = response.data.counties

    if (this.couties && this.couties.length === 1) {
      this.selectedCountie = this.couties[0]
      // console.log('selectedCountie', this.selectedCountie)
      // sessionStorage.setItem('fip', this.selectedCountie.fips)
    }
    console.log('Counties', response.data)
  })
}
createQuote(customerId:any,zipCode:any){
  console.log('zipCode',zipCode)
  sessionStorage.setItem('zipcode',zipCode)
  console.log('customerId',customerId)
  this.commonservice.createQuote(customerId,this.agentId).subscribe((response: any) => {

    if (response.status==true) {
      console.log('response.data.zipCode',response.data.zipCode)
      sessionStorage.setItem('zipcode',response.data.zipCode)  
    } 
    this.showAddCustomerForm = !this.showAddCustomerForm;
  });
 
  this.route.navigate(['quoting'])

  
}
quickQuote() {
  sessionStorage.setItem('zipcode','')
  this.route.navigate(['quoting'])
}

  isDropdownOpen: boolean = false;
    output: any;
  showAddCustomerForm: boolean = false;
  hideQuickQuoteBtn: boolean = true;
  firstName:any
  middleName:any
  selectedAbout:any

  
  constructor(private elementRef: ElementRef,    
     private commonservice: CommonService, 
     private fb: FormBuilder,
     public dialog: MatDialog,private route: Router) {
  }
  
  toggleDropdown(customer: any) {
    customer.isDropdownOpen = !customer.isDropdownOpen;
  }
  openConfirmationPopup(customerId:any) {
    sessionStorage.setItem('customerId',customerId)
    this.dialog.open(DeleteConfirmationComponent, { width: '600px', panelClass: ['alert-popup', 'alert-warning'] })
  }
  addCustomerForm() {
    this.showAddCustomerForm = !this.showAddCustomerForm;
    this.hideQuickQuoteBtn = !this.hideQuickQuoteBtn;    
  }
  onCheckboxChange() {
    this.isMailingAddressSame =!this.isMailingAddressSame;
    console.log('this.isMailingAddressSame',this.isMailingAddressSame)
  }
  county(event: any) {
    console.error('event:', event);
    sessionStorage.setItem('fip', event.value.fips)
  }
  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.isDropdownOpen = false;
  //   }
  // }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      completeScope:['', Validators.required],
      phone1: ['', Validators.required],
      phoneType1: ['', Validators.required],
      phone2: ['', Validators.required],
      phoneType2:['', Validators.required],
      isMailingAddressSame:[false, Validators.required]
      
      // ... other form controls
    });
    console.log('this.firstName',this.firstName)
    this.agentId = sessionStorage.getItem('agentId')
    if(this.agentId) {    
    this.commonservice.viewCustomer(this.agentId).subscribe((response: any) => {
      if (response.status==true) {
        this.output =response.data        
      } 
    });
  }
    


  }
  
}

