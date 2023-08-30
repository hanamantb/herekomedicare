import {Component, HostListener, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
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
  effYear: any = '2023'
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
  cartPlanIds: String[] = [];

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
    let npiArray: any[] = [];
    let drugsArray: any[] = [];
    if (npis) {
      npiArray = JSON.parse(npis);
    }
    if (drugs) {
      this.drugsArray = JSON.parse(drugs);
    }
    this.updateApidrugs(this.drugsArray)
    console.log('zip----', zip)
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

    this.commonservice.searchPlans(searchPlanReqBody, plan_type, this.snp_type, zip,
      fips, page, isDrugAdded, this.starRating, this.effYear, this.filterCarrier,
      this.filterplanType, this.sort_order, this.vision, this.dental, this.hearing, this.transportation,
      this.silver_snekers).subscribe((response) => {

      if (response.status) {
        this.response = response.data
        sessionStorage.setItem('planResponse', JSON.stringify(this.response))
        const resp = response.data.plans
        const addedplans = resp.map((element: any, index: any) => {
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
    this.plans = []
    this.getPlans(0)
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
    sessionStorage.setItem('plandetail', JSON.stringify(plan))
    this.route.navigate(['/plan-detail'], {
      state: {data: plan},
    });
  }

  openDrugsCovered() {
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
    if (currentMonth > 10) {
      // If the current month is greater than October, show the div
      this.showDiv = true;

      // Calculate the next year
      this.currentYear = currentYear;
      this.nextYear = currentYear + 1;
    }
  }

  drugCost(drug: any) {
    console.log('drugcost', drug)
    sessionStorage.setItem('drugcost', JSON.stringify(drug))
    window.open('/drug-cost')
    // this.route.navigate(['/drug-cost'])
  }
}
