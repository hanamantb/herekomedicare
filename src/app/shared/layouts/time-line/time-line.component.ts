import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {
  @Input() curentWorkStageId: number=2
  @Input() unCompleteWorkStageId: number=2
  constructor() { }

  ngOnInit(): void {
  }
  dataList = [{workStageId: 1 , stage: 'Basics(LIS)'},
    {workStageId: 2 , stage: 'Prescription Drugs'},
    {workStageId: 3 , stage: 'Pharmacies'},
    {workStageId: 4 , stage: 'Doctors'},
    {workStageId: 5 , stage: 'Quote'},
  ]
}
