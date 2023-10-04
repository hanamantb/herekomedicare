import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddDrugComponent} from "../add-drug/add-drug.component";
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CommonService} from "../../services/common.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorPopupComponent} from "../../shared/layouts/error-popup/error-popup.component";


@Component({
  selector: 'app-zipcode-qouting',
  templateUrl: './zipcode-qouting.component.html',
  styleUrls: ['./zipcode-qouting.component.css']
})
export class ZipcodeQoutingComponent implements OnInit {
  isChecked = true;
  zipcode: any;
  zipcodeForm!: FormGroup;
  couties: any = []
  selectedCountie: any = [];
  enteredValue: string = '';
  lis = "LIS_NO_HELP"
  showDiv: boolean = false;
  currentYear!: number;
  nextYear!: number;

  constructor(private route: Router, public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas,
              private commonService: CommonService,
              private http: HttpClient,
              public fb: FormBuilder) {
    this.zipcodeForm = this.fb.group({
      myControl: [null, [Validators.required, Validators.minLength(5), Validators.pattern("^[0-9]*$")]],
    })
  }

  get myControl() {
    return this.zipcodeForm.get('myControl')!;
  }

  ngOnInit(): void {
    // localStorage.clear()
    this.yeargetter()
    const zip = sessionStorage.getItem('zipcode')
    this.zipcodeForm.patchValue({
      myControl: zip
    })
    this.getCounties(zip)
  }

  drug() {
    this.route.navigate(['add-drugs'])
  }

  doctrs() {
    this.route.navigate(['doctors'])
  }

  navToPlans() {
    // this.route.navigate(['Plans'])
    console.log('checked---', this.isChecked)
    if (!this.zipcodeForm.valid || this.selectedCountie.length === 0) {
      this.dialog.open(ErrorPopupComponent, {
        data: {customMsg: 'Enter a valid ZIP code and select the relevant county to view the list of plans.'},
        width: '600px'
      })
    } else {

      const countie = this.selectedCountie.name + ', ' + this.selectedCountie.state
      sessionStorage.setItem('countie', countie)
      sessionStorage.setItem('lis', this.lis)
      console.log('lis----', this.lis)
      if (this.isChecked) {
        this.route.navigate(['add-drugs'])
      } else {
        this.route.navigate(['Plans'])
      }
    }
  }

  getCounties(zip: any) {
    this.selectedCountie=[]
    this.couties=[]
    this.commonService.getCounties(zip).subscribe(response => {
      this.couties = response.data.counties

      if (this.couties && this.couties.length === 1) {
        this.selectedCountie = this.couties[0]
        console.log('selectedCountie', this.selectedCountie)
        sessionStorage.setItem('fip', this.selectedCountie.fips)
      }
      console.log('Counties', response.data)
    })
  }

  inputCounties(event: any) {
    if (event.target.value.length === 5) {
      console.log('event', event.target.value)
      this.selectedCountie = event.target.value
      sessionStorage.setItem('zipcode', event.target.value)
      this.selectedCountie = []
      this.couties = []
      this.getCounties(event.target.value)
    } else {
      this.couties = []
      this.selectedCountie = []
      console.log('Not valid')
    }
  }

  _displayplantname(option: any) {
    const zip = sessionStorage.getItem('zipcode')
    let zipString: any
    if (zip) {
      zipString = JSON.parse(zip);
    }
    this.enteredValue = zipString
    return this.enteredValue;
  }


  county(event: any) {
    console.error('event:', event);
    sessionStorage.setItem('fip', event.value.fips)
  }

  // lisChange(event: any) {
  //   console.log(event.value)
  //   this.lis = event.value
  //   localStorage.setItem('lis',this.lis )
  // }

  yeargetter() {
    const currentDate = new Date();

    // Extract the current year and month
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0, so we add 1
    sessionStorage.setItem('effectyear',currentYear.toString())
    if (currentMonth >= 10) {
      // If the current month is greater than October, show the div
      this.showDiv = true;

      // Calculate the next year
      this.currentYear = currentYear;
      this.nextYear = currentYear + 1;
      sessionStorage.setItem('effectyear',this.nextYear.toString())
    }else{
      sessionStorage.setItem('effectyear',this.currentYear.toString())
    }
  }
  handleCheckboxClick(year:any){
    sessionStorage.setItem('effectyear',year)
    console.log('effectyear',year)
  }

}
