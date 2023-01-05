import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TemperatureComponent} from "./temperature/temperature.component";
import {MaskDetectorComponent} from "./mask-detector/mask-detector.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import { DevicesComponent } from "./devices/devices.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {path: "mask", component: MaskDetectorComponent },
  {path: "sensor", component: TemperatureComponent },
  {path: "devices", component: DevicesComponent}

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule { }
