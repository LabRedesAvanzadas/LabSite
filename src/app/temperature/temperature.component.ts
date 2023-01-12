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

  range = new FormGroup({
    start: new FormControl<Date | null>(getLastPDay(new Date(),0)),
    end: new FormControl<Date | null>(new Date()),
  });

  ngAfterViewInit(): void {
    var textWrapper = document.querySelector('.ml21 .letters');
    textWrapper!.innerHTML = textWrapper!.textContent!.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml21 .line',
        scaleY: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700
      })
      .add({
        targets: '.ml21 .line',
        translateX: [0, document!.querySelector('.ml21 .letters')!.getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100
      }).add({
      targets: '.ml21 .letter',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=775',
      delay: (el:any, i:any) => 34 * (i+1)
    }).add({
      targets: '.ml21',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 10000000000
    });
  }


  datat: any;
  options: any;
  updateOptions: any;
  rangeTemperature: any = [];
  dateRecord : any = [];
  private data: any;
  private timer: any;

  constructor(private api: ApiConectionService) {
  }

  ngOnInit(): void {
    this.getLastTemperature();
    this.getRangeTemperature('01/12/2023', '01/12/2023');
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          return this.datat.createAt
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
    this.updateOptions = {
      series: [{
        data: this.rangeTemperature
      }]
    };
    this.timer = setInterval(() => {
      this.getLastTemperature();
      this.rangeTemperature.push(parseFloat(this.datat.temperature));
      this.updateOptions = {
        series: [{
          data: this.rangeTemperature
        }]
      };
    }, 180000);
    //this.getRangeTemperature("01/12/2023","01/12/2023");
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
    this.api.getQuery("getSensor?init_date=".concat(date_ini).concat("&end_date=" + date_fin)).subscribe((response: any) => {
      Object.values(response).map(i => {
        // @ts-ignore
        this.rangeTemperature.push(parseFloat(i.temperature))
        // @ts-ignore
        this.dateRecord.push(i.createAt)
      })
    });
    console.log(this.rangeTemperature)
  }

  enviar() {
    let y = moment(this.range.value.start)
    let x = moment(this.range.value.end)
    this.rangeTemperature = []
    this.dateRecord= []

    this.getRangeTemperature(y.format("MM/DD/YYYY").toString(),x.format("MM/DD/YYYY").toString())
    this.updateOptions.series.data = this.rangeTemperature
  }
}
function getLastPDay(date = new Date(), i : number) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - i);
  return previous;
}
