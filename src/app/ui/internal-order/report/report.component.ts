import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: any;
  filreport: any;
  tdhide = false

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getReportBudgets('2023')
  }

  getReportBudgets(financialYear:any): void {
    this.commonService.getReportBudgets(financialYear).subscribe((response) => {
      console.log(response);
      this.report = response.data;
      this.report = this.report.map((element: any, index: any) => {
          return {
            ...element,
            showIO: true,
          }
        }
      );
      this.filreport = response.data;
    });
  }

  search(event: any) {
    if (event.target.value == '') {
      this.report = this.filreport;
    }
    console.log('event', event.target.value)
    const data = this.filreport.filter((x: any) => x.budgetCode.toLowerCase().includes(event.target.value.toLowerCase())
      || x.budgetDesc.toLowerCase().includes(event.target.value.toLowerCase())
    )
    this.report = data;
  }

  ioExpand(report: any) {
    report.showIO = !report.showIO
  }

  financialYear(event:any) {
    console.log(event.value)
    this.getReportBudgets(event.value)
  }
}
