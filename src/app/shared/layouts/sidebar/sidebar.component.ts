import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', {static: true}) drawer!: MatSidenav;
  @Input() planCount!: string
  @Input() totalCount!: string
  opened: boolean = false;
  panelOpenState = false;
  benefitchck = true
  carrierNames: any;
  carrierVal: any;
  @Input() selectedFilters: boolean = true
  filterPlanType: any = []
  filterSnpType: any = ["SNP_TYPE_NOT_SNP"]
  planBenefits = [
    {name: 'Vision', value: 'vision', checked: false},
    {name: 'Dental', value: 'dental', checked: false},
    {name: 'Hearing', value: 'hearing', checked: false},
    {name: 'Transportation', value: 'transportation', checked: false},
    {name: 'Fitness benefits', value: 'silver_snekers', checked: false},
  ]

  snpPlanTypes = [
    {
      label: 'C-SNP: Plans for people who have a chronic or disabling condition (like stroke, cancer, or dementia).',
      value: 'SNP_TYPE_CHRONIC_OR_DISABLING',
      isChecked: false
    },
    {label: ' D-SNP: Plans for people who have both Medicare and Medicaid.', value: 'SNP_TYPE_DUAL_ELIGIBLE', isChecked: false},
    {
      label: 'I-SNP: Plans for people who need long-term care in a facility or at home.',
      value: 'SNP_TYPE_INSTITUTIONAL',
      isChecked: false
    }
  ]

  planTypes = [
    {label: 'HMO (Health Maintenance Organization)', value: 'PLAN_FILTER_HMO', checked: false},
    {label: 'PPO (Preferred Provider Organization)', value: 'PLAN_FILTER_PPO', checked: false},
    {label: 'MSA (Medical Savings Account)', value: 'PLAN_FILTER_MSA', checked: false}
  ]
  selectedOption: any

  constructor(private route: Router,
              private shared: SharedService,
              private commonservice: CommonService) {
  }

  ngOnInit(): void {
    // Delay the execution of code for 1 minute (60,000 milliseconds)
    setTimeout(() => {
      // Your code here
      this.shared.getCarrier.subscribe(() => {
        this.getcarrierNames()
      });
      this.getcarrierNames()
      // This code will run after 1 minute
    }, 60000); // 60,000 milliseconds = 1 minute
   
  }

  test(drawer: MatDrawer) {
    console.log('menu clicked inside sidebar');
    drawer.toggle();
  }

  navToPages(page: string) {
    this.route.navigate([page])
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '';
    }

    return `${value}`;
  }

  benefit(event: any) {
    this.benefitchck = !this.benefitchck
    this.shared.benefitcheckchange(event.target.checked)
  }

  optnchk(check: any) {
    console.log(check.target.checked)
    this.shared.optncheckchange(check.target.checked)
  }

  starRating(rating: any) {
    console.log(rating)
    this.shared.starRatingchange(rating)
  }

  getcarrierNames() {
    const fips = sessionStorage.getItem('fip')
    let effectyear: any = sessionStorage.getItem('effectyear')
    if (effectyear === null) {
      const currentDate = new Date();
      effectyear = currentDate.getFullYear();
    }
    this.commonservice.carrierName(fips, effectyear).subscribe(response => {
      console.log('shdvhvd',response.data.maPdCarrier)
      this.carrierNames = response.data.maPdCarrier

    })
    console.log('this.carrierNames',this.carrierNames)
  }

  carrierFilter(event: any) {
    console.log('event.target-', event.target)
    this.carrierVal = event.target.value
    // if (event.target.checked){
    //   this.filtercarrier.push(event.target.value)
    // }else{
    //   this.filtercarrier.forEach((element:any,index:any)=>{
    //     if (element ===event.target.value ){
    //       this.filtercarrier.splice(index,1)
    //     }
    //   })
    // }
    // console.log('filtercarrier-',this.filtercarrier)
    this.shared.carrierchange(event.target.value)
  }

  planTypeFilter(event: any) {
    if (event.target.checked) {
      this.filterPlanType.push(event.target.value)
    } else {
      this.filterPlanType.forEach((element: any, index: any) => {
        if (element === event.target.value) {
          this.filterPlanType.splice(index, 1)
        }
      })
    }
    this.shared.planTypechange(this.filterPlanType)
  }

  snpTypeFilter(event: any) {
    if (event.target.checked) {
      this.filterSnpType.push(event.target.value)
    } else {
      this.filterSnpType.forEach((element: any, index: any) => {
        if (element === event.target.value) {
          this.filterSnpType.splice(index, 1)
        }
      })
    }
    console.log('snp_types', this.filterSnpType)
    this.shared.snpTypechange(this.filterSnpType)
  }

  sortBy(event: any) {
    this.shared.sortingchange(event.target.value)
  }

  updateBenefits(variable: string, event: any) {
    if (event.target.checked) {
      this.shared.updateRadioState(variable);
    } else {
      this.shared.updateRadioStatetofalse(variable);
    }
  }

  benefitapply() {
    this.shared.triggerFunction()
  }

  clearbenefits() {
    this.shared.updatebenefitAlltofalse()
    for (const item of this.planBenefits) {
      item.checked = false;
      this.shared.benefitcheckchange(null);
    }
    this.shared.triggerFunction()
  }

  clearplanTypes() {
    for (const item of this.planTypes) {
      item.checked = false;
      this.shared.planTypechange([]);
    }
    this.shared.triggerFunction()
  }
  clearCompanies() {   
    this.carrierVal = '';
    this.shared.carrierchange(null);
  }

  clearStarRating() {
    this.shared.starRatingchange('6');
    this.selectedOption = null
    this.shared.triggerFunction()
  }


  clearsnpTypes() {
    for (const item of this.snpPlanTypes) {
      item.isChecked = false;
      this.shared.snpTypechange(["SNP_TYPE_NOT_SNP"]);
    }
    this.shared.triggerFunction()
  }

  clearFilters() {
    this.clearplanTypes();
    this.clearsnpTypes();
    this.clearbenefits();
    this.clearStarRating();
    this.clearCompanies();
    /*this.shared.optncheckchange(null);*/
  }


}
