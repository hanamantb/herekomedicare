import {Component, OnInit, Output} from '@angular/core';
import EventEmitter = NodeJS.EventEmitter;
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {CommonService} from "../../services/common.service";

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
  plans:any=[];
  // @Output() menuClicked = new EventEmitter();

  constructor(private route: Router,
              private sharedService: SharedService,
              private commonservice:CommonService) {
  }

  ngOnInit(): void {
    this.getPlans()
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

  getPlans(){
    const searchPlanReqBody ={
      npis: [
        1073617049,
        1124045505,
        1669593042
      ],
      prescriptions: [
        {
          ndc: "31722056224",
          frequency: "FREQUENCY_30_DAYS",
          quantity: 4
        }
      ],
      lis: "LIS_NO_HELP"
    };
    const plan_type = [
        "PLAN_TYPE_MA",
        "PLAN_TYPE_MAPD",
        "PLAN_TYPE_PDP"
      ];
    const snp_type=[
      "SNP_TYPE_NOT_SNP",
      "SNP_TYPE_CHRONIC_OR_DISABLING",
      "SNP_TYPE_DUAL_ELIGIBLE",
      "SNP_TYPE_INSTITUTIONAL"
    ]
    this.commonservice.searchPlans(searchPlanReqBody,plan_type,snp_type).subscribe((response)=>{
      this.plans = response.data.plans
      console.log('response',response)
    })
  }
}
