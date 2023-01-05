import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { MaskDetectorComponent } from './mask-detector/mask-detector.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { DevicesComponent } from "./devices/devices.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemperatureComponent,
    MaskDetectorComponent,
    DevicesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        NgbModule,
        RouterLink,
        FontAwesomeModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        HttpClientModule,
        AppRoutingModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
