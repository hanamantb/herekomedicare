import {Component, HostListener, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import EventEmitter = NodeJS.EventEmitter;
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {CommonService} from "../../services/common.service";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {SpinnerService} from "../../services/spinner.service";
import {DrugsCoveredDialogboxComponent} from '../../shared/layouts/drugs-covered-dialogbox/drugs-covered-dialogbox.component';
import {EditPlansPopupComponent} from '../../shared/layouts/edit-plans-popup/edit-plans-popup.component';
import {ErrorPopupComponent} from "../../shared/layouts/error-popup/error-popup.component";
import { forkJoin } from 'rxjs';


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
  stars: number[] = [0, 1, 2, 3, 4];
  selectedCardIndex: any;
  plans: any = [];
  filtrPlans: any = [];
  zipcode: any
  myControl = new FormControl();
  couties: any
  fips: any
  lis: any
  effYear: any
  drugsArray: any=[]
  showDiv: any = false
  page: any = 0;
  selectedCountie: any;
  planTypes: any = "PLAN_TYPE_MAPD"
  // @Output() menuClicked = new EventEmitter();
  response: any = [];
  cart: any = [];
  currentYear!: number;
  starRating: any = '6';
  filterCarrier: any = '';
  sort_order: any = 'ANNUAL_TOTAL';
  filterplanType: any = [];
  filterEnable: boolean = false
  vision: boolean = false
  dental: boolean = false
  hearing: boolean = false
  transportation: boolean = false
  silver_snekers: boolean = false
  originalRateC: boolean = false
  selectedFilter: boolean = true
  eacDrugcostPre: boolean = true
  maxSelections: number = 5;
  showTooltip: boolean = false;
  tooltipIndex: number = -1;
  
  snp_type: any = [
    "SNP_TYPE_NOT_SNP",
  ];
  nextYear!: number;
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
  shouldHideSpan:boolean =true;  
  showDrugs:boolean =false;
  cartPlanIds: String[] = [];
  planTypeName: string = 'Medicare Advantage & Prescription Plans';
  searchPlans: any;
  processPlans: any;
  
  constructor(private route: Router,
              private sharedService: SharedService,
              private commonservice: CommonService,
              public dialog: MatDialog,
              private quoteDetailsService: QuoteDataDetailsService,
              private spinner: SpinnerService) {
  }


  ngOnInit(): void {
    this.zipcode = sessionStorage.getItem('zipcode')
    this.fips = sessionStorage.getItem('fips')
    this.lis = sessionStorage.getItem('lis')
    this.zipcode += ' ' + sessionStorage.getItem('countie')
    const drugs = sessionStorage.getItem('drugs')
    if (drugs) {
      this.drugsArray = JSON.parse(drugs);
      if(this.drugsArray.length !== 0){
        console.log('this.drugsArray',this.drugsArray)
        this.showDrugs = !this.showDrugs
      }
    }
    console.log("this.showDrugs"+this.showDrugs)
    this.sharedService.benefitcheck$.subscribe((value: any) => {
      this.benefitChange(value)
    });
    this.sharedService.optncheck$.subscribe((value: any) => {
      this.optinPackChange(value)
    });
    this.sharedService.carrierFilter.subscribe((value: any) => {
      if (this.filterEnable) {
        this.filterCarrier = value
        console.log('filterCarrier', this.filterCarrier)
        this.getPlans('0')
      }
    });

    this.sharedService.starRatings.subscribe((value) => {
      if (this.filterEnable) {
        console.log('starRating', value)
        this.starRating = value;
        this.getPlans('0')
      }
    });

    this.sharedService.planTypeFilter.subscribe((value: any) => {
      console.log('plantype', value)
      if (this.filterEnable) {
        this.filterplanType = value;
      }
    });
    this.sharedService.snpTypeFilter.subscribe((value: any) => {
      if (this.filterEnable) {
        this.snp_type = value;
      }
    });
    this.sharedService.sortBy.subscribe((value: any) => {
      if (this.filterEnable) {
        this.sort_order = value;
        this.getPlans('0')
      }
    });
    this.sharedService.applyFilter.subscribe(() => {
      this.getPlans('0')
    });
    this.sharedService.radioState$.subscribe(state => {
      // if (this.filterEnable) {
      this.vision = state.vision
      this.dental = state.dental
      this.hearing = state.hearing
      this.transportation = state.transportation
      this.silver_snekers = state.silver_snekers
//         this.getPlans('0')


      // }
    });
    let cartArray: any[] = [];
    const cart = sessionStorage.getItem('cart')
    if (cart) {
      cartArray = JSON.parse(cart);
    }
    this.sharedService.cartCount(cartArray.length)
    const plans = sessionStorage.getItem('plans')
    // let plansarray: any[] = [];
    // if (plans) {
    //   plansarray = JSON.parse(plans);
    // }
    // if (plansarray.length !== 0) {
    //   this.plans = plansarray
    // } else {
    this.yeargetter()
    this.getPlans('0')
    // }

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

  }

  addToCart(plan: any) {
    if (!plan.cartAdded) {
      this.cart.push(plan)
      this.cartPlanIds.push(plan.planID)
      this.sharedService.cartCount(this.cart.length);
    }
    plan.cartAdded = true
    console.log('cli',this.cart)

    sessionStorage.setItem('cartPlanIds', JSON.stringify(this.cartPlanIds))
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
  }

  selectButton() {
    this.selected = true;
  }


  getPlans(page: any) {
    this.plans = []
    this.filtrPlans = []
    const spine = this.spinner.start()
    const zip = sessionStorage.getItem('zipcode')
    const fips = sessionStorage.getItem('fip')
    const drugs = sessionStorage.getItem('drugs')
    const npis = sessionStorage.getItem('pharmacies')
    const lis = sessionStorage.getItem('lis')
    this.effYear = sessionStorage.getItem('effectyear')
    console.log('this.effYear',this.effYear)
    let npiArray: any[] = [];
    let drugsArray: any[] = [];   
    if (drugs) {
      drugsArray = JSON.parse(drugs);
    }
    if (npis) {
      npiArray = JSON.parse(npis);
    }   
    this.updateApidrugs(this.drugsArray)
    if(drugsArray.length === 0){
      console.log('inside null')
      npiArray = []; 
    }
    console.log(' A this.drugsArray',this.drugsArray)
    console.log(' A npiArray',npiArray)
    const searchPlanReqBody = {
      npis: npiArray,
      prescriptions: this.drugsArray,
      lis: lis
    };
    const plan_type = [
      this.planTypes
    ];

    let isDrugAdded = true
    if (this.drugsArray.length === 0) {
      isDrugAdded = false
    }
    console.log('this.effYear plan list',this.effYear)
    const searchPlans = this.commonservice.searchPlans(searchPlanReqBody, plan_type, this.snp_type, zip,
      fips, this.effYear,page, isDrugAdded, this.starRating, this.filterCarrier,
      this.filterplanType, this.sort_order, this.vision, this.dental, this.hearing, this.transportation,
      this.silver_snekers);
      const processPlans = this.commonservice.processPlans(searchPlanReqBody, plan_type, this.snp_type, zip,
        fips, this.effYear,page, isDrugAdded, this.starRating, this.filterCarrier,
        this.filterplanType, this.sort_order, this.vision, this.dental, this.hearing, this.transportation,
        this.silver_snekers);


Promise.all([searchPlans, processPlans]).then(results => {
 results[0].subscribe((response) => {
  

  if (response.status) {
    this.response = response.data
    console.log('this.response',this.response)
    sessionStorage.setItem('planResponse', JSON.stringify(this.response))
    const resp = response.data.plans
    const addedplans = resp.map((element: any, index: any) => {
      if(element.optional_benefits.length !== 0){
      console.log('element plp',element)
      element.optional_benefits.forEach((op:any) => {
        op.checked = false 
      })
      }
      return {
        ...element, checked: false,
        showmore: false,
        optnpkShow: false,
        cartAdded: false,
        benefits: true,
        alloptnpkShow: true,
      };
    });
  const planIds= sessionStorage.getItem('cartPlanIds')
  const cart=    sessionStorage.getItem('cart')
  if(planIds && cart){
    let planIdsArray: any[] = [];
    planIdsArray=JSON.parse(planIds);
    addedplans.forEach((element: any) => {
    planIdsArray.forEach((planId: string) => {
    if(planId == element.planID){
      element.cartAdded =true;
    }
  })
      this.plans.push(element)
    })
}else{
  console.log('response', response)
  addedplans.forEach((element: any) => {
    this.plans.push(element)
  })
}
    this.filterEnable = true
    this.filtrPlans = this.plans
    sessionStorage.setItem('plans', JSON.stringify(this.plans))
    this.page = this.page + 1
    this.spinner.stop(spine)
    console.log('response', response)
  } else {
    this.spinner.stop(spine)
    this.dialog.open(ErrorPopupComponent, {data: {customMsg: response.message}, width: '600px'})

    console.log('response false', response)
  }
})
 
  results[1].subscribe((response) => {
    this.processPlans = 
    response
    console.log('this.processPlans',this.processPlans)
   });
  
});
}

  onCheckboxChange(plan: any) {
    const index = this.checkedData.indexOf(plan);

    if (index === -1 && this.checkedData.length < this.maxSelections) {
      // If the plan is not in the checkedData array, add it
      this.checkedData.push(plan);
    } else {
      // If the plan is already in the checkedData array, remove it
      this.checkedData.splice(index, 1);
    }

    console.log('checkkkk', this.checkedData.length);

    if (this.checkedData.length >= 2) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
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
    this.clearCompare();

    this.plans = []
    this.getPlans(0)
    if (this.planTypes == 'PLAN_TYPE_MA') {
      this.planTypeName = 'Medicare Advantage Plans (Part C)';
      this.originalRateC = false;
      this.selectedFilter = true;
      this.eacDrugcostPre = false

    }
    else if (this.planTypes == 'PLAN_TYPE_PDP') {
      this.planTypeName = 'Prescription Plans (Part D)';
      this.originalRateC = false;
      this.selectedFilter = false;
      this.eacDrugcostPre = true
    }
    else {
      this.planTypeName = 'Medicare Advantage & Prescription Plans';
      this.originalRateC = false;
      this.selectedFilter = true;
      this.eacDrugcostPre = true
    }
    
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex;
    const endIndex = startIndex + event.pageSize;
    this.getPlans(startIndex)
    console.log('startIndex', event.pageIndex)
    console.log('endIndex', endIndex)
  }

  updateApidrugs(data: any) {
    console.log('data-----------', data)
    if (data !== undefined) {
      data.forEach((drugsObj: any) => {
        this.frequency.forEach((freobj: any) => {
          if (freobj.name === drugsObj.frequency) {
            drugsObj.frequency = freobj.values
          }
        })

      });
    }
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

  optinPackChange(value: any) {
    this.plans.forEach((x: any) => {
      x.alloptnpkShow = value
    })
  }

  deducable(attributes: any) {
    console.log('attributes', attributes)
  }


  lisChange() {
    sessionStorage.setItem('lis', this.lis)
    this.getPlans(0)
  }

  effectYearChange(event: any) {
    sessionStorage.setItem('effectyear', this.effYear)
    this.getPlans(0)
  }

  planDetail(plan: any) {
  sessionStorage.setItem('plandetail', JSON.stringify(plan));
  sessionStorage.setItem('planID', plan.planID)
  sessionStorage.setItem('logo', plan.logo)
  sessionStorage.setItem('planType', plan.planType)
  const newWindow = window.open('/plan-detail', '_blank');
  if (newWindow) {
    newWindow.postMessage({ data: plan }, '*');
  }
}

  openDrugsCovered(plan:any) {
    console.log('plan',plan)
    const drugs = sessionStorage.getItem('drugs')
    let drugList:[]=[];
    if (drugs) {
      drugList = JSON.parse(drugs);      
        console.log('drugList',drugList)
    }
    plan.forEach((plan:any) => {
      drugList.forEach((drug:any) => {
        if(plan.ndc === drug.ndc){
          drug.tier = plan.tier;
        }
      });
      
    });
    sessionStorage.setItem('drugs', JSON.stringify(drugList))
    console.log('updated drug list',drugList)
    this.dialog.open(DrugsCoveredDialogboxComponent);
  }

  openEditPlansPopup() {
    const matref = this.dialog.open(EditPlansPopupComponent);

    matref.afterClosed().subscribe((resp: any) => {
      if (resp === true) {
        this.getPlans(0)
        this.planTypes = "PLAN_TYPE_MAPD"
        this.zipcode = sessionStorage.getItem('zipcode')
        this.fips = sessionStorage.getItem('fips')
        this.lis = sessionStorage.getItem('lis')
        this.effYear = sessionStorage.getItem('effectyear')
        this.zipcode += ' ' + sessionStorage.getItem('countie')
        this.sharedService.getAllcarriers()
      }
    })
  }

  // @HostListener('window:scroll', ['$event'])
  // scroll(event: Event) {
  //   const scrollY = window.scrollY;
  //   const windowHeight = window.innerHeight;
  //   const documentHeight = document.documentElement.scrollHeight;
  //   // Check if the user is near the bottom of the page
  //   if (scrollY + windowHeight >= documentHeight ) {
  //     console.log('scrolled down',this.page)
  //     if (this.page!==0){
  //       this.getPlans(this.page)
  //     }
  //
  //   }
  //
  // }
  clearCompare() {
    this.checkedData = []
    this.isChecked = false
    this.plans.forEach((element: any) => {
      element.checked = false
    })
  }

  planbenefitcheck(attribute: any) {
    const filData = attribute.filter((x: any) => x.displayValue === 'true')
    console.log('planbenefitcheck', filData)
    if (filData.length !== 0) {
      return true
    } else {
      return false
    }
  }

  yeargetter() {
    const currentDate = new Date();

    // Extract the current year and month
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0, so we add 1
    if (currentMonth >= 10) {
      // If the current month is greater than October, show the div
      this.showDiv = true;

      // Calculate the next year
      this.currentYear = currentYear;
      this.nextYear = currentYear + 1;
    }
  }

  drugCost(drug: any) { 
    sessionStorage.setItem('planName', drug.planName)
    sessionStorage.setItem('planID', drug.planID)
    sessionStorage.setItem('monthlypremium', drug.monthlypremium)
    sessionStorage.setItem('drugcost', JSON.stringify(drug))     
    sessionStorage.setItem('planType', drug.planType)

    window.open('/drug-cost')    
  }
  handleToggleClick(value:boolean) {   
    this.shouldHideSpan = value;   
  }
  planCompare(){
    console.log('plan compare')
    console.log('this.checkedData',this.checkedData)
    sessionStorage.setItem('planCompareData', JSON.stringify(this.checkedData))
    this.route.navigate(['plan-compare'])
  }

  packageSelection(event:any,plan:any,monthlypremium:any,packageNumber:any){
    console.log('packageNumber',packageNumber)
    const stringWithoutFirstLetter = monthlypremium.slice(1);
    console.log('stringWithoutFirstLetter',stringWithoutFirstLetter);
    const packageValue = parseFloat(stringWithoutFirstLetter);
    console.log('packageValue',packageValue);
    const monthlyPremiumParseValue = parseFloat(plan.monthlypremium);
    console.log('monthlyPremiumParseValue',monthlyPremiumParseValue)
    this.plans.forEach((element: any) => {
     
      if(element.planID === plan.planID){
        
        if(event.target.checked === true){
          const finalMonthlyPremium = packageValue + monthlyPremiumParseValue;
          console.log('plan in package selection',element)
        element.optional_benefits.forEach((op:any) => {
          if(op.package_number === packageNumber){
            op.checked = true;
          }
        })
        
          console.log('finalMonthlyPremium',finalMonthlyPremium)
        element.monthlypremium = finalMonthlyPremium.toString();        
      }else{   
        element.optional_benefits.forEach((op:any) => {
          if(op.package_number === packageNumber){
            op.checked = false;
          }
        })    
        const finalMonthlyPremium = monthlyPremiumParseValue - packageValue;
          element.monthlypremium = finalMonthlyPremium.toString();
          console.log('result false'+finalMonthlyPremium)
      }
      console.log('plan after selection or unselect'+plan)
    }
    })
   
  }
 
}
