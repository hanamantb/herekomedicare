import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { BottomBarComponent } from './layouts/bottom-bar/bottom-bar.component';
import { TimeLineComponent } from './layouts/time-line/time-line.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    BottomBarComponent,
    TimeLineComponent,
    SidebarComponent
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
