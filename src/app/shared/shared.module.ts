import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { BottomBarComponent } from './layouts/bottom-bar/bottom-bar.component';
import { TimeLineComponent } from './layouts/time-line/time-line.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    BottomBarComponent,
    TimeLineComponent
  ],
  imports: [

    CommonModule
  ],
    exports: [
        ToolbarComponent,
        BottomBarComponent,
        TimeLineComponent
    ]
})
export class SharedModule { }
