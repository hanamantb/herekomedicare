import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-edit-plans-popup',
  templateUrl: './edit-plans-popup.component.html',
  styleUrls: ['./edit-plans-popup.component.css']
})
export class EditPlansPopupComponent implements OnInit {
  zipcode:any;
  countys:any;
  editForm!: FormGroup;
  couties: any = [];
  selectedCountie: any = [];
  constructor(public dialog: MatDialog,public fb: FormBuilder,
              private commonService: CommonService,
              private dialogRef: MatDialogRef<EditPlansPopupComponent>) {
    this.editForm = this.fb.group({
      myControl: [null, [Validators.required, Validators.minLength(5), Validators.pattern("^[0-9]*$")]],
      county:[null],
      lis:[null],
      effectYear:[null]
    })
  }
  get myControl() {
    return this.editForm.get('myControl')!;
  }
  ngOnInit(): void {
    this.zipcode = sessionStorage.getItem('zipcode')
    const lis = sessionStorage.getItem('lis')
    const effectyear = sessionStorage.getItem('effectyear')
    this.editForm.patchValue({
      myControl: this.zipcode,
      lis: lis,
      effectYear: effectyear,
    })
    this.getCounties(this.zipcode)
  }
  getCounties(zip: any) {
    this.commonService.getCounties(zip).subscribe(response => {
      this.couties = response.data.counties
      //
      if (this.couties && this.couties.length === 1) {
        this.selectedCountie = this.couties[0]

        sessionStorage.setItem('fip', this.selectedCountie.fips)
      }else{
        const fips = sessionStorage.getItem('fip')
        const filCountie = this.couties.filter((x:any)=> x.fips === fips)
        if (filCountie){
          this.selectedCountie =filCountie[0]
        }
      }
    })
  }

  inputCounties(event: any) {
    if (event.target.value.length === 5) {
      console.log('event', event.target.value)
      this.zipcode=event.target.value
      this.getCounties(event.target.value)
    } else {
      console.log('Not valid')
    }
  }
  county(event: any) {
    console.error('event:', event);
    this.countys=event.value
    console.log(this.countys)
  }
  close(change:boolean) {
    console.log(this.editForm.value.effectYear)
    if (change){
      sessionStorage.setItem('zipcode', this.zipcode)
      sessionStorage.setItem('fip',this.selectedCountie.fips)
      sessionStorage.setItem('countie',this.selectedCountie.name +', '+this.selectedCountie.state)
      sessionStorage.setItem('lis',this.editForm.value.lis)
      sessionStorage.setItem('effectyear',this.editForm.value.effectYear)
    }
    this.dialogRef.close(change)
  }
}
