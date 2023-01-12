import {Component, OnInit} from '@angular/core';
import {ApiConectionService} from "../services/api-conection.service"
import moment from "moment";

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.sass']
})
export class TemperatureComponent implements  OnInit{
  datat : any;
  options: any;
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: any;
  private value: any;
  private data: any;
  private timer: any;

  constructor(private api: ApiConectionService) { }

  ngOnInit(): void {
    this.getLastTemperature();
    this.data = [];
    this.now = new Date(1997, 9, 3);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data
      }]
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 1000);
    this.getRangeTemperature("01/12/2023","01/12/2023");
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData() {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }


  getLastTemperature(){
    this.api.getQuery('getlastSensed').subscribe((response: any) => {
      this.datat=response
      console.log(this.datat)

    });
  }
  getRangeTemperature( ini : string, fin: string ){
    let date_ini = moment(ini).format("DD/MM/YYYY")
    let date_fin = moment(fin).format("DD/MM/YYYY")
    this.api.getQuery("getSensor?init_date=".concat(date_ini).concat("&end_date="+date_fin)).subscribe((response : any) => {
      this.datat = response
      console.log(date_fin, date_ini)
      console.log(this.datat)
    });
  }


}
