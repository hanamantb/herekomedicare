import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescription-drugs',
  templateUrl: './prescription-drugs.component.html',
  styleUrls: ['./prescription-drugs.component.css']
})
export class PrescriptionDrugsComponent implements OnInit {
showmore:boolean =false
benefits:boolean =false
  constructor() { }

  ngOnInit(): void {
  }

  showMore(){
  this.showmore = !this.showmore
  }
  benefitShow(){
  this.benefits = !this.benefits
  }

}
