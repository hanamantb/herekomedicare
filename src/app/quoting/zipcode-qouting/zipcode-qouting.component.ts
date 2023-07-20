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
  couties: any=[]
  selectedCountie: any;
  enteredValue: string = '';

  constructor(private route: Router, public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas,
              private commonService: CommonService,
              private http: HttpClient,
              public fb: FormBuilder) {
    this.zipcodeForm = this.fb.group({
      myControl: [null, [Validators.required, Validators.minLength(5),Validators.pattern("^[0-9]*$")]],
    })
  }

  get myControl() {
    return this.zipcodeForm.get('myControl')!;
  }

  ngOnInit(): void {
    localStorage.clear()
    this.getDrugByAlphbet()
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
    if (!this.zipcodeForm.valid) {
      this.dialog.open(ErrorPopupComponent, {data:{customMsg:'Enter a valid ZIP code and select the relevant county to view the list of plans.'},width: '600px'})
    } else {
      if (this.isChecked) {
        this.route.navigate(['add-drugs'])
      } else {
        this.route.navigate(['Plans'])
      }
    }
  }

  getCounties(event: any) {
    if (event.target.value.length === 5) {
      console.log('event', event.target.value)
      this.selectedCountie = event.target.value
      localStorage.setItem('zipcode', event.target.value)
      this.commonService.getCounties(event.target.value).subscribe(response => {
        this.couties = response.data.counties
        if (this.couties && this.couties.length === 1) {
          this.selectedCountie = this.couties[0]
          console.log('selectedCountie', this.selectedCountie)
          localStorage.setItem('fip', this.selectedCountie.fips)
        }
        console.log('Counties', response.data)
      })
    } else {
      console.log('Not valid')
    }
  }

  _displayplantname(option: any) {
    const zip = localStorage.getItem('zipcode')
    let zipString: any
    if (zip) {
      zipString = JSON.parse(zip);
    }
    this.enteredValue = zipString
    return this.enteredValue;
  }

  getDrugByAlphbet() {
    const body = {
      "letter": "A",
      "year": "2023"
    };
    this.http.post('http://66.193.196.108:8080/medicare-service/v1/search_drug-by-letter', body)
      .subscribe(
        (response: any) => {
          console.log('Response:', response);

          // Handle the response here
        },
        error => {
          console.error('Error:', error);
          // Handle errors here
        }
      );
  }

  county(event: any) {
    console.error('event:', event);
    localStorage.setItem('fip', event.value.fips)
  }
  lisChange(event:any){
  console.log(event.value)
  localStorage.setItem('lis',event.value)
  }


}
