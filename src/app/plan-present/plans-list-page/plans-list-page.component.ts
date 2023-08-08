import {Component, HostListener, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import EventEmitter = NodeJS.EventEmitter;
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {CommonService} from "../../services/common.service";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {SpinnerService} from "../../services/spinner.service";
import { DrugsCoveredDialogboxComponent } from '../../shared/layouts/drugs-covered-dialogbox/drugs-covered-dialogbox.component';


@Component({
  selector: 'app-plans-list-page',
  templateUrl: './plans-list-page.component.html',
  styleUrls: ['./plans-list-page.component.css']
})
export class PlansListPageComponent implements OnInit {
 @ViewChild('Zipchange', {static: true}) Zipchange!: TemplateRef<any>;
  benefits: boolean = false
  optnpkShow: boolean = false
  isChecked: boolean = false
  sideopen: boolean = true
  checkedData: any = [];
  value = 4.5;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedCardIndex: any;
  plans: any = [];
  filtrPlans: any = [];
  zipcode: any
  myControl = new FormControl();
  couties: any
  fips: any
  lis: any
  page: any = 0;
  selectedCountie: any;
  planTypes: any = "PLAN_TYPE_MAPD"
  // @Output() menuClicked = new EventEmitter();
  response: any = [];
  frequency = [{
    name: 'Every month',
    values: 'FREQUENCY_30_DAYS'
  },
    {
      name: 'Every 2 months',
      values: 'FREQUENCY_60_DAYS'
    },
    {
      name: 'Every 3 months',
      values: 'FREQUENCY_90_DAYS'
    },
    {
      name: 'Every 6 months',
      values: 'FREQUENCY_180_DAYS'
    },
    {
      name: 'Every 12 months',
      values: 'FREQUENCY_360_DAYS'
    }]
  selected: boolean = false;

  constructor(private route: Router,
              private sharedService: SharedService,
              private commonservice: CommonService,
              public dialog: MatDialog,
              private quoteDetailsService: QuoteDataDetailsService,
              private spinner: SpinnerService) {
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



  ngOnInit(): void {
    this.zipcode = sessionStorage.getItem('zipcode')
    this.fips = sessionStorage.getItem('fips')
    this.lis = sessionStorage.getItem('lis')
    this.zipcode += ' ' + sessionStorage.getItem('countie')
    console.log('lis', this.lis)
    this.sharedService.benefitcheck$.subscribe((value: any) => {
      this.benefitChange(value)
    });

    // const plans = sessionStorage.getItem('plans')
    // let plansarray: any[] = [];
    // if (plans) {
    //   plansarray = JSON.parse(plans);
    // }
    // if (plansarray.length !== 0) {
    //   this.plans = plansarray
    // } else {
    //
    // }
    this.getPlans(0)
  }

  showbenfit(plan: any) {
    plan.optnpkShow = true
  }

  showMore(plan: any) {
    plan.showmore = true
  }

  showLess(plan: any) {
    plan.showmore = false
  }

  benefitShow(plan: any) {
    plan.benefits = !plan.benefits
  }

  onMenuClicked() {
    console.log('menu clicked inside toolbar');
    // this.menuClicked.emit('');
  }

  showOp(plan: any) {
    plan.optnpkShow = !plan.optnpkShow
    console.log('cli')
  }

  cart(plan: any) {
    if (!plan.cartAdded) {
      this.sharedService.incrementNumber();
    }
    plan.cartAdded = true

  }

  selectButton() {
    this.selected = true;
  }

  getPlans(page: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const spine = this.spinner.start()
    const zip = sessionStorage.getItem('zipcode')
    const fips = sessionStorage.getItem('fip')
    const drugs = sessionStorage.getItem('drugs')
    const npis = sessionStorage.getItem('pharmacies')
    const lis = sessionStorage.getItem('lis')
    let npiArray: any[] = [];
    let drugsArray: any[] = [];
    if (npis) {
      npiArray = JSON.parse(npis);
    }
    if (drugs) {
      drugsArray = JSON.parse(drugs);
    }
    this.updateApidrugs(drugsArray)
    console.log('npis----', drugsArray)
    const searchPlanReqBody = {
      npis: npiArray,
      prescriptions: drugsArray,
      lis: lis
    };
    const plan_type = [
      this.planTypes
    ];
    const snp_type = [
      "SNP_TYPE_NOT_SNP",
      "SNP_TYPE_CHRONIC_OR_DISABLING",
      "SNP_TYPE_DUAL_ELIGIBLE",
      "SNP_TYPE_INSTITUTIONAL"
    ]
    this.commonservice.searchPlans(searchPlanReqBody, plan_type, snp_type, zip, fips, page).subscribe((response) => {
      this.response = response.data
      sessionStorage.setItem('planResponse', JSON.stringify(this.response))
      const resp = response.data.plans
      const addedplans = resp.map((element: any, index: any) => {
        return {
          ...element, checked: false,
          showmore: false,
          optnpkShow: false,
          cartAdded: false,
          benefits: true
        };
      });
      addedplans.forEach((element: any) => {
        this.plans.push(element)
      })
      this.filtrPlans = this.plans
      sessionStorage.setItem('plans', JSON.stringify(this.plans))
      this.page = this.page + 1
      this.spinner.stop(spine)
      console.log('response', response)
    })
  }

  onCheckboxChange(plan: any) {
    this.checkedData.push(plan)
    console.log('checkkkk', this.checkedData.length)
    if (this.checkedData.length >= 2) {
      this.isChecked = true
    }
  }

  _displayplantname(countie: any) {
    const zip = sessionStorage.getItem('displayzipcode')
    if (countie) {
      return zip + ''
    }
    return '';
  }

  getCounties(event: any) {
    if (event.target.value.length === 5) {
      this.selectedCountie = event.target.value
      sessionStorage.setItem('zipcode', event.target.value)
      this.commonservice.getCounties(event.target.value).subscribe(response => {
        this.couties = response.data.counties
      })
    } else {
      console.log('Not valid')
    }
  }


  zipChange() {
    this.dialog.open(this.Zipchange, {width: '400px'})
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
    this.planTypes = event.value
    this.getPlans(0)
    // const plans =this.filtrPlans.filter((x:any)=>
    //   x.planType === event.value
    // )
    // this.plans = plans
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex;
    const endIndex = startIndex + event.pageSize;
    this.getPlans(startIndex)
    console.log('startIndex', event.pageIndex)
    console.log('endIndex', endIndex)
  }

  updateApidrugs(data: any) {

    data.forEach((drugsObj: any) => {
      this.frequency.forEach((freobj: any) => {
        if (freobj.name === drugsObj.frequency) {
          drugsObj.frequency = freobj.values
        }
      })

    });
  }

  navHome() {
    this.route.navigate([''])
  }

  sidebar() {
    this.sideopen = !this.sideopen
  }

  benefitChange(value: any) {
    console.log('benefitChange', value)
    this.plans.forEach((x: any) => {
      x.benefits = value
    })
  }

  deducable(attributes: any) {
    console.log('attributes', attributes)
  }


  lisChange() {
    sessionStorage.setItem('lis', this.lis)
    this.getPlans(0)
  }

  planDetail() {
    this.route.navigate(['plan-detail'])
  }

  openDrugsCovered() {
    const dialogRef = this.dialog.open(DrugsCoveredDialogboxComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onScroll(event: Event) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user is near the bottom of the page
    if (scrollY + windowHeight >= documentHeight - 100) {
      // You can trigger your function here
      // For example, emit an event or call a function in a component
      // YourComponent.yourFunction();
      console.log('scrolled down')
    }

  }
  @HostListener('window:scroll', ['$event'])
  scroll(event: Event) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    // Check if the user is near the bottom of the page
    if (scrollY + windowHeight >= documentHeight ) {
      console.log('scrolled down',this.page)
      if (this.page!==0){
        this.getPlans(this.page)
      }

    }

  }
}
