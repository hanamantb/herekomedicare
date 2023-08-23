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
  effYear: any ='2023'
  drugsArray: any
  showDiv:any=false
  page: any = 0;
  selectedCountie: any;
  planTypes: any = "PLAN_TYPE_MAPD"
  // @Output() menuClicked = new EventEmitter();
  response: any = [];
  cart: any = [];
  currentYear!: number;
  starRating: any='5';
  filterCarrier: any='';
  sort_order: any='ANNUAL_TOTAL';
  filterplanType: any=[];
  filterEnable: boolean = false
  vision: boolean = false
  dental: boolean = false
  hearing: boolean = false
  transportation: boolean = false
  silver_snekers: boolean = false
  snp_type: any=[
    "SNP_TYPE_NOT_SNP",
    "SNP_TYPE_CHRONIC_OR_DISABLING",
    "SNP_TYPE_DUAL_ELIGIBLE",
    "SNP_TYPE_INSTITUTIONAL"
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
      if (this.filterEnable){
        this.filterCarrier =value
        console.log('filterCarrier', this.filterCarrier)
        this.getPlans('0')
      }
    });

    this.sharedService.starRatings.subscribe((value) => {
      if (this.filterEnable){
        this.starRating = value;
        this.getPlans('0')
      }
    });

    this.sharedService.planTypeFilter.subscribe((value: any) => {
      if (this.filterEnable){
        this.filterplanType = value;
      }
    });
    this.sharedService.snpTypeFilter.subscribe((value: any) => {
      if (this.filterEnable){
        this.snp_type = value;
      }
    });
    this.sharedService.sortBy.subscribe((value: any) => {
      if (this.filterEnable){
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
        console.log('starRating', state)
        console.log('starRating', this.vision)

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
      this.sharedService.cartCount(this.cart.length);
    }
    plan.cartAdded = true
    console.log('cli',this.cart)
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
  }

  selectButton() {
    this.selected = true;
  }

  dupGetplans(){
    const resp=[
      {
        "planName": "MedMutual Advantage Signature (HMO)(H6723-006-2)",
        "planID": "H6723-006-2",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "168.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,200 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "5.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$335 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0-10 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$188 per day for days 21 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$35 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$35 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$200 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#1",
            "monthly_premium": "$26.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental and eyewear"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 354.15,
                "deductible_cost": 0,
                "initial_cost": 42,
                "gap_cost": 88.54,
                "catastrophic_cost": 17.71,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 168
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 168,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 1060.2,
                "deductible_cost": 0,
                "initial_cost": 110,
                "gap_cost": 265.05,
                "catastrophic_cost": 53.01,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 220
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 110
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 110
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 220,
            "preferred": true,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "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"
      },
      {
        "planName": "MedMutual Advantage Access (PPO)(H4497-005-2)",
        "planID": "H4497-005-2",
        "planType": "MAPD",
        "planCategory": "PPO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "168.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$11,000 In and Out-of-network<br />$6,050 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "5.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$40 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#1",
            "monthly_premium": "$26.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental and eyewear"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 354.15,
                "deductible_cost": 0,
                "initial_cost": 42,
                "gap_cost": 88.54,
                "catastrophic_cost": 17.71,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 168
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 168,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 1060.2,
                "deductible_cost": 0,
                "initial_cost": 110,
                "gap_cost": 265.05,
                "catastrophic_cost": 53.01,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 220
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 110
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 110
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 220,
            "preferred": true,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "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"
      },
      {
        "planName": "Molina Medicare Choice Care (HMO)(H9955-002-0)",
        "planID": "H9955-002-0",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "173.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$8,300 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "3.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$225 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "0-20% coinsurance",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$184 per day for days 21 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$20 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$25 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$200 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 2,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 452.534,
                "deductible_cost": 452.53,
                "initial_cost": 12,
                "gap_cost": 113.13,
                "catastrophic_cost": 22.63,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 173
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 125,
                "initial": 12,
                "gap": 0,
                "catastrophic": 0,
                "total": 137
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 12,
                "gap": 0,
                "catastrophic": 0,
                "total": 12
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 12,
                "gap": 0,
                "catastrophic": 0,
                "total": 12
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 12,
                "gap": 0,
                "catastrophic": 0,
                "total": 12
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 125,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 173,
            "preferred": false,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 1131.768,
                "deductible_cost": 1131.77,
                "initial_cost": 24,
                "gap_cost": 282.94,
                "catastrophic_cost": 56.59,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 173
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 125,
                "initial": 24,
                "gap": 0,
                "catastrophic": 0,
                "total": 149
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 24,
                "gap": 0,
                "catastrophic": 0,
                "total": 24
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 125,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 173,
            "preferred": false,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "iVBORw0KGgoAAAANSUhEUgAAAIkAAAAvCAYAAADXYek6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5NjQ5REVGM0MwMzExRTI4NTc2QkY2Q0U0OTQ3QkUxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM5NjQ5REYwM0MwMzExRTI4NTc2QkY2Q0U0OTQ3QkUxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzk2NDlERUQzQzAzMTFFMjg1NzZCRjZDRTQ5NDdCRTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk2NDlERUUzQzAzMTFFMjg1NzZCRjZDRTQ5NDdCRTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4g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"
      },
      {
        "planName": "MediGold Mount Carmel No Premium (HMO)(H3668-019-1)",
        "planID": "H3668-019-1",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "180.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,500 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "4.5",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$0-270 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0-50 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$196 per day for days 21 through 58<br />$0 per day for days 59 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$35 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$45 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$250 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#1",
            "monthly_premium": "$16.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental"
          },
          {
            "package_number": "Package#2",
            "monthly_premium": "$34.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 271.244,
                "deductible_cost": 0,
                "initial_cost": 45,
                "gap_cost": 67.81,
                "catastrophic_cost": 13.56,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 180
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 180,
            "preferred": false,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 818.55,
                "deductible_cost": 0,
                "initial_cost": 90,
                "gap_cost": 204.64,
                "catastrophic_cost": 40.93,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 180
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 90,
                "gap": 0,
                "catastrophic": 0,
                "total": 90
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 90,
                "gap": 0,
                "catastrophic": 0,
                "total": 90
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 180,
            "preferred": false,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": null
      },
      {
        "planName": "Wellcare No Premium (HMO)(H0908-003-0)",
        "planID": "H0908-003-0",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "223.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,700 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "3.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$250 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$196 per day for days 21 through 50<br />$0 per day for days 51 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$35 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$110 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$55 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$250 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 280.84,
                "deductible_cost": 280.84,
                "initial_cost": 37,
                "gap_cost": 70.21,
                "catastrophic_cost": 14.04,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 223
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 75,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 112
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 37
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 37
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 37
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 75,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 223,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 678.33,
                "deductible_cost": 678.33,
                "initial_cost": 74,
                "gap_cost": 169.58,
                "catastrophic_cost": 33.92,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 223
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 75,
                "initial": 74,
                "gap": 0,
                "catastrophic": 0,
                "total": 149
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 74,
                "gap": 0,
                "catastrophic": 0,
                "total": 74
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 75,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 223,
            "preferred": true,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "iVBORw0KGgoAAAANSUhEUgAAAIkAAAAvCAYAAADXYek6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAUWaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0OCA3OS4xNjQwMzYsIDIwMTkvMDgvMTMtMDE6MDY6NTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDktMzBUMDk6NTE6MTYtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA5LTMwVDEwOjU3OjM2LTA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA5LTMwVDEwOjU3OjM2LTA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5j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"
      },
      {
        "planName": "MedMutual Advantage Classic (HMO)(H6723-001-3)",
        "planID": "H6723-001-3",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "263.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,900 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "5.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$360 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0-10 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$188 per day for days 21 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$5 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$40 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$35 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$225 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#1",
            "monthly_premium": "$26.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental and eyewear"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 354.15,
                "deductible_cost": 354.15,
                "initial_cost": 42,
                "gap_cost": 88.54,
                "catastrophic_cost": 17.71,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 263
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 95,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 137
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 95,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 263,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 1060.2,
                "deductible_cost": 1060.2,
                "initial_cost": 110,
                "gap_cost": 265.05,
                "catastrophic_cost": 53.01,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 315
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 95,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 205
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 110
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 95,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 315,
            "preferred": true,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "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"
      },
      {
        "planName": "Wellcare No Premium Open (PPO)(H7169-001-0)",
        "planID": "H7169-001-0",
        "planType": "MAPD",
        "planCategory": "PPO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "308.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$8,950 In and Out-of-network<br />$5,900 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "0.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$40 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$110 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 280.84,
                "deductible_cost": 280.84,
                "initial_cost": 37,
                "gap_cost": 70.21,
                "catastrophic_cost": 14.04,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 308
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 160,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 197
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 37
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 37
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 37,
                "gap": 0,
                "catastrophic": 0,
                "total": 37
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 160,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 308,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 678.33,
                "deductible_cost": 678.33,
                "initial_cost": 74,
                "gap_cost": 169.58,
                "catastrophic_cost": 33.92,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 308
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 160,
                "initial": 74,
                "gap": 0,
                "catastrophic": 0,
                "total": 234
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 74,
                "gap": 0,
                "catastrophic": 0,
                "total": 74
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 160,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 308,
            "preferred": true,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "iVBORw0KGgoAAAANSUhEUgAAAIkAAAAvCAYAAADXYek6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAjJaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA3LjAtYzAwMCA3OS5kYWJhY2JiLCAyMDIxLzA0LzE0LTAwOjM5OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA5LTA3VDA5OjM4OjI1LTA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOS0wN1QwOTo0MDoxOS0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wOS0wN1QwOTo0MDoxOS0wNTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkYzE0NmNkNy0yYjZjLTRmMjEtOGIwMi04NDlmM2Q4MzQzOGYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkMzhkNzc4OS03OWZhLTg5NDItYTMwMi0xODJlMjQ4MDEzZjkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyN2JkMmZiMy1jMjM0LTRmN2EtOGI3My04MWQ1Mjg2YjljYWIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyN2JkMmZiMy1jMjM0LTRmN2EtOGI3My04MWQ1Mjg2YjljYWIiIHN0RXZ0OndoZW49IjIwMjEtMDktMDdUMDk6NDA6MDctMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODc0ZDllYS0wMzVjLTRlNDAtODU4MS1lMDUzODI3MzgxYWYiIHN0RXZ0OndoZW49IjIwMjEtMDktMDdUMDk6NDA6MTktMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90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"
      },
      {
        "planName": "MediGold Mount Carmel Plus (HMO)(H3668-022-0)",
        "planID": "H3668-022-0",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "49.00",
        "orginalplanPremium": "49.00",
        "planPremium": "49.00",
        "monthlypremium": "49.00",
        "estimatedannualCost": "376.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,200 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "4.5",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$0-175 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0-20 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$196 per day for days 21 through 58<br />$0 per day for days 59 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$35 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$40 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$200 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#2",
            "monthly_premium": "$34.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental"
          },
          {
            "package_number": "Package#1",
            "monthly_premium": "$16.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 271.244,
                "deductible_cost": 0,
                "initial_cost": 45,
                "gap_cost": 67.81,
                "catastrophic_cost": 13.56,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 180
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 45,
                "gap": 0,
                "catastrophic": 0,
                "total": 45
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 180,
            "preferred": false,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 818.55,
                "deductible_cost": 0,
                "initial_cost": 90,
                "gap_cost": 204.64,
                "catastrophic_cost": 40.93,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 180
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 90,
                "gap": 0,
                "catastrophic": 0,
                "total": 90
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 90,
                "gap": 0,
                "catastrophic": 0,
                "total": 90
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 180,
            "preferred": false,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": null
      },
      {
        "planName": "Anthem MediBlue Preferred (HMO)(H3655-045-3)",
        "planID": "H3655-045-3",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "0.00",
        "orginalplanPremium": "0.00",
        "planPremium": "0.00",
        "monthlypremium": "0.00",
        "estimatedannualCost": "380.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,200 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "4.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$0-285 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0-95 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$196 per day for days 21 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$35 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$30 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$260 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 4,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": true,
            "on_formulary": true,
            "quantity_limit_amount": 60,
            "quantity_limit_days": 30,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#1",
            "monthly_premium": "$14.00",
            "deductible": "N/A",
            "benefits": "Includes preventive dental"
          },
          {
            "package_number": "Package#2",
            "monthly_premium": "$27.00",
            "deductible": "N/A",
            "benefits": "Includes preventive dental, comprehensive dental and eyewear"
          },
          {
            "package_number": "Package#3",
            "monthly_premium": "$42.00",
            "deductible": "N/A",
            "benefits": "Includes preventive dental, comprehensive dental and eyewear"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 271.624,
                "deductible_cost": 0,
                "initial_cost": 95,
                "gap_cost": 67.91,
                "catastrophic_cost": 13.58,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 380
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 95,
                "gap": 0,
                "catastrophic": 0,
                "total": 95
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 95,
                "gap": 0,
                "catastrophic": 0,
                "total": 95
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 95,
                "gap": 0,
                "catastrophic": 0,
                "total": 95
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 95,
                "gap": 0,
                "catastrophic": 0,
                "total": 95
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 380,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 813.672,
                "deductible_cost": 0,
                "initial_cost": 190,
                "gap_cost": 203.42,
                "catastrophic_cost": 40.68,
                "covered": true,
                "has_deductible": false,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 380
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 0,
                "initial": 190,
                "gap": 0,
                "catastrophic": 0,
                "total": 190
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 190,
                "gap": 0,
                "catastrophic": 0,
                "total": 190
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 0,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 380,
            "preferred": false,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "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"
      },
      {
        "planName": "MedMutual Advantage Secure (HMO)(H6723-005-2)",
        "planID": "H6723-005-2",
        "planType": "MAPD",
        "planCategory": "HMO",
        "orginalRate": "30.00",
        "orginalplanPremium": "30.00",
        "planPremium": "30.00",
        "monthlypremium": "30.00",
        "estimatedannualCost": "383.00",
        "attributes": {
          "Additional_Benefits": [
            {
              "planType": "1",
              "apiParameter": "vision_services",
              "attributeName": "Vision",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "13",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "dental_services",
              "attributeName": "Dental",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "14",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "hearing_services",
              "attributeName": "Hearing",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "15",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "transportation",
              "attributeName": "Transportation",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "16",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "additional_physical_exams",
              "attributeName": "Fitness Benefits",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "17",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "worldwide_emergency",
              "attributeName": "Worldwide Emergency",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "18",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "telehealth",
              "attributeName": "Telehealth",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "19",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "otc_drugs",
              "attributeName": "Over-The-Counter Drugs",
              "displayValue": "true",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "20",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "in_home_support",
              "attributeName": "In-Home Support",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "21",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "home_safety_devices",
              "attributeName": "Home Safety Devices & Modifications",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "22",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            },
            {
              "planType": "1",
              "apiParameter": "emergency_response_device",
              "attributeName": "Emergency Response Device",
              "displayValue": "false",
              "category": "Additional_Benefits",
              "categoryOrder_PlanTile": "5",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "23",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "0",
              "displayInProposals": "0"
            }
          ],
          "Key_Benefits": [
            {
              "planType": "1",
              "apiParameter": "annual_deductible",
              "attributeName": "Deductible",
              "displayValue": "$0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "1",
              "attributeOrder_MoreDetails": "1",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "maximum_oopc",
              "attributeName": "Max OOP",
              "displayValue": "$4,200 In-network",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "1",
              "attributeOrder_PlanTile": "2",
              "attributeOrder_MoreDetails": "2",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "rating",
              "attributeName": "Overall Star Rating",
              "displayValue": "5.0",
              "category": "Key_Benefits",
              "categoryOrder_PlanTile": "1",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "3",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Outpatient_Services": [
            {
              "planType": "1",
              "apiParameter": "BENEFIT_OUTPATIENT_HOSPITAL",
              "attributeName": "Facility Fees",
              "displayValue": "$375 copay per visit",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "10",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_DIAGNOSTIC_TESTS",
              "attributeName": "Diagnostic Tests (x-ray, blood work)",
              "displayValue": "$0-10 copay",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "11",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_SKILLED_NURSING_FACILITY",
              "attributeName": "Skilled Nursing Care Cost Share",
              "displayValue": "$0 per day for days 1 through 20<br />$188 per day for days 21 through 100",
              "category": "Outpatient_Services",
              "categoryOrder_PlanTile": "4",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "12",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Office_Visits": [
            {
              "planType": "1",
              "apiParameter": "primary_doctor_visit_cost",
              "attributeName": "Primary Care Visit",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "4",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "specialist_doctor_visit_cost",
              "attributeName": "Specialist Visit",
              "displayValue": "$30 copay per visit",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "5",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_PREVENTIVE_CARE",
              "attributeName": "Preventive Care/Screening Immunization",
              "displayValue": "$0 copay",
              "category": "Office_Visits",
              "categoryOrder_PlanTile": "2",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "6",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ],
          "Emergency_Services": [
            {
              "planType": "1",
              "apiParameter": "emergency_care_cost",
              "attributeName": "Emergency Room",
              "displayValue": "$90 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "7",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "SERVICE_URGENT_CARE",
              "attributeName": "Urgent Care",
              "displayValue": "$30 copay per visit (always covered)",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "8",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            },
            {
              "planType": "1",
              "apiParameter": "BENEFIT_AMBULANCE",
              "attributeName": "Ambulance",
              "displayValue": "$200 copay",
              "category": "Emergency_Services",
              "categoryOrder_PlanTile": "3",
              "categoryOrder_MoreDetails": "0",
              "attributeOrder_PlanTile": "9",
              "attributeOrder_MoreDetails": "0",
              "displayInPlantile": "1",
              "displayInMoredetails": "1",
              "displayInProposals": "1"
            }
          ]
        },
        "drugInfoList": [
          {
            "ndc": "64380071703",
            "tier": 3,
            "prior_auth": false,
            "step_therapy": false,
            "quantity_limit": false,
            "on_formulary": true,
            "quantity_limit_amount": 0,
            "quantity_limit_days": 0,
            "biosimilars": []
          }
        ],
        "optional_benefits": [
          {
            "package_number": "Package#1",
            "monthly_premium": "$26.00",
            "deductible": "N/A",
            "benefits": "Includes comprehensive dental and eyewear"
          }
        ],
        "costs": [
          {
            "npi": "1336473701",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 60,
                "frequency": "FREQUENCY_30_DAYS",
                "full_cost": 354.15,
                "deductible_cost": 354.15,
                "initial_cost": 42,
                "gap_cost": 88.54,
                "catastrophic_cost": 17.71,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 263
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 95,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 137
              },
              {
                "date": "2023-10-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-11-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 42,
                "gap": 0,
                "catastrophic": 0,
                "total": 42
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 95,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 263,
            "preferred": true,
            "mail_order": false,
            "ltc": false
          },
          {
            "npi": "",
            "drug_costs": [
              {
                "ndc": "64380071703",
                "quantity": 180,
                "frequency": "FREQUENCY_90_DAYS",
                "full_cost": 1060.2,
                "deductible_cost": 1060.2,
                "initial_cost": 110,
                "gap_cost": 265.05,
                "catastrophic_cost": 53.01,
                "covered": true,
                "has_deductible": true,
                "coverage_reason": "COVERED",
                "default_price_used": false,
                "cost_sharing_overide": false,
                "estimated_yearly_total": 315
              }
            ],
            "estimated_monthly_costs": [
              {
                "date": "2023-09-01",
                "deductible": 95,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 205
              },
              {
                "date": "2023-12-01",
                "deductible": 0,
                "initial": 110,
                "gap": 0,
                "catastrophic": 0,
                "total": 110
              }
            ],
            "in_network": true,
            "phase_information": {
              "deductible_amount": 95,
              "initial_coverage_start": "2023-09-01",
              "gap_start": "",
              "catastrophic_start": ""
            },
            "estimated_yearly_total": 315,
            "preferred": true,
            "mail_order": true,
            "ltc": false
          }
        ],
        "logo": "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"
      }
    ]
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
    addedplans.forEach((element: any) => {
      this.plans.push(element)
    })
    this.filtrPlans = this.plans
  }



  getPlans(page: any) {
    this.plans=[]
    this.filtrPlans=[]
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
    if (this.drugsArray.length === 0){
      isDrugAdded = false
    }

    this.commonservice.searchPlans(searchPlanReqBody, plan_type, this.snp_type, zip,
      fips, page, isDrugAdded,this.starRating,this.effYear,this.filterCarrier,
      this.filterplanType,this.sort_order,this.vision,this.dental,this.hearing,this.transportation,
      this.silver_snekers).subscribe((response) => {

      if (response.status){
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
      addedplans.forEach((element: any) => {
        this.plans.push(element)
      })
        this.filterEnable=true
      this.filtrPlans = this.plans
      sessionStorage.setItem('plans', JSON.stringify(this.plans))
      this.page = this.page + 1
      this.spinner.stop(spine)
      console.log('response', response)
    }else{
        this.spinner.stop(spine)
        console.log('response false', response)
      }})

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

  effectYearChange(event:any) {
    sessionStorage.setItem('effectyear',this.effYear)
    this.getPlans(0)
  }

  planDetail(plan:any) {
    sessionStorage.setItem('plandetail',JSON.stringify(plan) )
    this.route.navigate(['/plan-detail'], {
      state: { data: plan },
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
    this.checkedData=[]
    this.isChecked=false
    this.plans.forEach((element:any)=>{
      element.checked=false
    })
  }

  planbenefitcheck(attribute: any) {
    const filData=attribute.filter((x:any)=> x.displayValue=== 'true')
    console.log('planbenefitcheck',filData)
    if (filData.length !== 0){
      return true
    }else{
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
}
