import {Component, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import EventEmitter = NodeJS.EventEmitter;
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {CommonService} from "../../services/common.service";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-prescription-drugs',
  templateUrl: './prescription-drugs.component.html',
  styleUrls: ['./prescription-drugs.component.css']
})
export class PrescriptionDrugsComponent implements OnInit {
  @ViewChild('Zipchange', {static: true}) Zipchange!: TemplateRef<any>;
  showmore: boolean = false
  benefits: boolean = false
  optnpkShow: boolean = false
  isChecked:boolean =false
  checkedData:any=[];
  value = 4.5;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedCardIndex:any;
  plans:any=[];
  filtrPlans:any=[];
  zipcode:any
  myControl = new FormControl();
  couties: any
  fips: any
  selectedCountie:any;
  fontStyle:any ="MAPD"
  // @Output() menuClicked = new EventEmitter();
   response: any=[];

  constructor(private route: Router,
              private sharedService: SharedService,
              private commonservice:CommonService,
              public dialog: MatDialog,
              private quoteDetailsService:QuoteDataDetailsService,
  private spinner:SpinnerService) {
  }

  ngOnInit(): void {
    this.zipcode = localStorage.getItem('zipcode')
    this.fips = localStorage.getItem('fips')
    this.getPlans(0)

  }
  showbenfit(plan:any) {
    plan.optnpkShow = true
  }
  showMore(plan:any) {
    plan.showmore = true
  }
  showLess(plan:any) {
    plan.showmore = false
  }

  benefitShow(plan:any) {
    plan.benefits = !plan.benefits
  }

  onMenuClicked() {
    console.log('menu clicked inside toolbar');
    // this.menuClicked.emit('');
  }

  showOp(plan:any) {
    plan.optnpkShow=!plan.optnpkShow
    console.log('cli')
  }

  cart(plan:any) {
    plan.cartAdded =true
    this.sharedService.incrementNumber();
  }

  selected: boolean = false;

  selectButton() {
    this.selected = true;
  }

  getPlans(page:any){
    const spine=this.spinner.start()
    const zip = localStorage.getItem('zipcode')
    const fips = localStorage.getItem('fip')
    const drugs = localStorage.getItem('drugs')
    const npis = localStorage.getItem('pharmacies')
    let npiArray: any[] = [];
    let drugsArray: any[] = [];
    if (npis) {
      npiArray = JSON.parse(npis);
    }
    if (drugs) {
      drugsArray = JSON.parse(drugs);
    }

    console.log('npis----',npiArray)
    const searchPlanReqBody ={
      npis: npiArray,
      prescriptions: drugsArray,
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
    this.commonservice.searchPlans(searchPlanReqBody,plan_type,snp_type,zip,fips,page).subscribe((response)=>{
      this.plans = response.data.plans
      this.response = response.data
      this.plans = this.plans.map((element:any, index:any) => {
        return { ...element, checked: false,
          showmore:false,
          optnpkShow:false,
          cartAdded:false,
          benefits:false};
      });
      this.filtrPlans = this.plans
      const plans =this.filtrPlans.filter((x:any)=>
        x.planType ==='MAPD'
      )
      this.plans = plans
      this.spinner.stop(spine)
      console.log('response',response)
    })
  }

  onCheckboxChange(plan:any) {
    this.checkedData.push(plan)
    console.log('checkkkk',this.checkedData.length)
    if (this.checkedData.length >= 2){
      this.isChecked = true
    }
  }
  get fullStars(): number[] {
    return Array(Math.floor(this.value)).fill(0);
  }

  get halfStar(): boolean {
    return this.value % 1 !== 0;
  }

  get emptyStars(): number[] {
    const totalStars = 5;
    const fullAndHalfStars = Math.floor(this.value) + (this.halfStar ? 1 : 0);
    return Array(totalStars - fullAndHalfStars).fill(0);
  }

  _displayplantname(countie: any) {
    const zip = localStorage.getItem('displayzipcode')
    if (countie) {
      return   zip +''
    }
    return '';
  }

  getCounties(event: any) {
    if (event.target.value.length === 5) {
      this.selectedCountie =event.target.value
      localStorage.setItem('zipcode',event.target.value)
      this.commonservice.getCounties(event.target.value).subscribe(response => {
        this.couties = response.data.counties
      })
    } else {
      console.log('Not valid')
    }
  }


  zipChange() {
    this.dialog.open(this.Zipchange,{width:'400px'})
  }

  cancel() {
    this.dialog.closeAll()
  }

  prescription() {
    this.route.navigate(['add-pharmacy'])
    this.dialog.closeAll()
  }


  planType(event: any) {
    console.log(event.value)
    const plans =this.filtrPlans.filter((x:any)=>
      x.planType === event.value
    )
    this.plans = plans
  }
  onPageChange(event: any) {
    const startIndex = event.pageIndex + 1;
    const endIndex = startIndex + event.pageSize;
    this.getPlans(startIndex)
    console.log('startIndex', event.pageIndex)
    console.log('endIndex', endIndex)
  }
}
