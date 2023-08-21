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
  filterPlanType: any = []
  filterSnpType: any = ["SNP_TYPE_NOT_SNP"]

  constructor(private route: Router,
              private shared: SharedService,
              private commonservice: CommonService) {
  }

  ngOnInit(): void {
    this.getcarrierNames()
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

      this.carrierNames = response.data
    })

  }

  carrierFilter(event: any) {
    console.log('event.target-', event.target)
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
    this.shared.snpTypechange(this.filterSnpType)
  }

  sortBy(event:any){
    this.shared.sortingchange(event.target.value)
  }
  updateBenefits(variable: string,event:any) {
    if (event.target.checked){
      this.shared.updateRadioState(variable);
    }else{
      this.shared.updateRadioStatetofalse(variable);
    }
  }

}
