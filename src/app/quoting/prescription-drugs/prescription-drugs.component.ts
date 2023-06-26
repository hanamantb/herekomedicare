import {Component, OnInit, Output} from '@angular/core';
import EventEmitter = NodeJS.EventEmitter;
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-prescription-drugs',
  templateUrl: './prescription-drugs.component.html',
  styleUrls: ['./prescription-drugs.component.css']
})
export class PrescriptionDrugsComponent implements OnInit {
  showmore: boolean = false
  benefits: boolean = false
  optnpkShow: boolean = false
  isChecked1:boolean =false
  isChecked2:boolean =false
  // @Output() menuClicked = new EventEmitter();

  constructor(private route: Router,private sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

  showMore() {
    this.showmore = !this.showmore
  }

  benefitShow() {
    this.benefits = !this.benefits
  }

  onMenuClicked() {
    console.log('menu clicked inside toolbar');
    // this.menuClicked.emit('');
  }

  showOp() {
    this.optnpkShow=!this.optnpkShow
    console.log('cli')
  }

  cart() {
    // this.route.navigate(['cart-home'])
    this.sharedService.incrementNumber();
  }

  clear() {
    this.isChecked1=false
    this.isChecked2=false
  }
}
