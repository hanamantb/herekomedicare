import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddDrugComponent} from "../add-drug/add-drug.component";
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CommonService} from "../../services/common.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-zipcode-qouting',
  templateUrl: './zipcode-qouting.component.html',
  styleUrls: ['./zipcode-qouting.component.css']
})
export class ZipcodeQoutingComponent implements OnInit {
  isChecked = true;
  zipcode: any;
  myControl = new FormControl();
  couties: any
  selectedCountie:any;

  constructor(private route: Router, public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas,
              private commonService: CommonService, private http: HttpClient) {
  }

  ngOnInit(): void {
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
    if (this.isChecked) {
      this.route.navigate(['add-drugs'])
      // this.dialog.open(AddDrugComponent, {
      //   autoFocus: false,
      //   maxHeight: '90vh',
      //   width: '140vh'
      // })
    } else {
      this.route.navigate(['Plans'])
    }

  }

  getCounties(event: any) {
    if (event.target.value.length === 5) {
      console.log('event', event.target.value)
      this.selectedCountie =event.target.value
      localStorage.setItem('zipcode',event.target.value)
      this.commonService.getCounties(event.target.value).subscribe(response => {
        this.couties = response.data.counties
         })
    } else {
      console.log('Not valid')
    }
  }


  _displayplantname(countie: any) {
    console.log('countie', this.selectedCountie)
    const zip = localStorage.getItem('zipcode')
    if (countie) {
      const dispname= zip +'-'+countie.name +','+countie.state
      localStorage.setItem('displayzipcode',dispname)
      return   dispname
    }
    return '';
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
}
