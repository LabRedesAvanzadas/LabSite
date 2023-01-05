import {Component, OnInit} from '@angular/core';
import {ApiConectionService} from "../services/api-conection.service"

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.sass']
})
export class TemperatureComponent implements  OnInit{
  data : any;

  constructor(private api: ApiConectionService) { }

  ngOnInit(): void {
    this.getLastTemperature();
  }
  getLastTemperature(){
    this.api.getQuery('getlastSensed').subscribe((response: any) => {
      this.data=response
      console.log(this.data)

    });
  }


}
