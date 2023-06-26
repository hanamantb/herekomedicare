import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { BottomBarComponent } from './layouts/bottom-bar/bottom-bar.component';
import { TimeLineComponent } from './layouts/time-line/time-line.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedService} from "../services/shared.service";
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    ToolbarComponent,
    BottomBarComponent,
    TimeLineComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatBadgeModule
  ],
    exports: [
        ToolbarComponent,
        BottomBarComponent,
        TimeLineComponent,
        SidebarComponent,

    ],
  providers: [SharedService],

})
export class SharedModule { }
