import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiConectionService} from "../services/api-conection.service"
import {FormControl, FormGroup} from "@angular/forms";
import moment from "moment";
declare var anime: any;

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.sass']
})
export class TemperatureComponent implements  OnInit, AfterViewInit {

  range : any;

  ngAfterViewInit(): void {
    //this.getRangeTemperature(moment().format("DD/MM/YYYY"), moment().format("DD/MM/YYYY"));
    this.enviar();
  }


  datat: any;
  options: any;
  updateOptions: any;
  rangeTemperature: any = [];
  dateRecord : any = [];
  private data: any;
  private timer: any;

  constructor(private api: ApiConectionService) {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(getLastPDay(new Date(),0)),
      end: new FormControl<Date | null>(new Date()),
    });
  }

  ngOnInit(): void {
    this.options = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          params = params[0];
          let date = new Date(params.value[0]);
          return "Fecha: " + date.getDate() + '/' + (date.getMonth()+1) + ' ' + date.toLocaleTimeString() + '\n Temp: ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        },
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
        data: this.dateRecord
      }]
    };

  }


  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getLastTemperature() {
    this.api.getQuery('getlastSensed').subscribe((response: any) => {
      this.datat = response
      console.log(this.datat)
    });
  }

  getRangeTemperature(ini: string, fin: string) {
    let date_ini = moment(ini).format("DD/MM/YYYY")
    let date_fin = moment(fin).format("DD/MM/YYYY")
    console.log(this.rangeTemperature)
    let tempRange: number[] = [];
    let tempDate: any[] = [];
    let tempData: { value: any[]; }[] = [];
    this.api.getQuery("getSensor?init_date=".concat(date_ini).concat("&end_date=" + date_fin)).subscribe((response: any) => {

      Object.values(response).map((i:any) => {
        console.log(i.createAt)
        tempData.push( {
          value : [moment.utc(i.createAt).toDate(), i.temperature]
        });
      })

      this.rangeTemperature = tempRange;
      this.dateRecord = tempDate;
      this.updateOptions = {
        series: [{
          data: tempData
        }]
      };

    });
  }

  enviar() {
    let y = moment(this.range.value.start)
    let x = moment(this.range.value.end)
    this.rangeTemperature = []
    this.dateRecord= []
    this.getRangeTemperature(y.format("MM/DD/YYYY").toString(),x.format("MM/DD/YYYY").toString())
  }
}

function getLastPDay(date = new Date(), i : number) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - i);
  return previous;
}
