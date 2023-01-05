import {Component, OnInit} from '@angular/core';
import {ApiConectionService} from "../services/api-conection.service"
//import dirs from "/src/assets/";
import * as _ from "lodash";
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.sass']
})
export class DevicesComponent implements OnInit{
  isCollapsed = true;
  dirs= {
    "servers": [
      "200.126.14.227",
      "200.126.14.228",
      "200.126.14.229",
      "200.126.14.230",
      "200.126.14.231",
      "200.126.14.232",
      "200.126.14.233",
      "200.126.14.234",
      "200.126.14.235"
    ],
    "workstations": [
      "200.126.14.238",
      "200.126.14.239",
      "200.126.14.240",
      "200.126.14.241",
      "200.126.14.242",
      "200.126.14.243",
      "200.126.14.244",
      "200.126.14.245",
      "200.126.14.246",
      "200.126.14.247"
    ]
  }
  data = { _id: []};
  servers : any[] = [];
  workstations : any [] = [];

  constructor(private api: ApiConectionService) { }

  ngOnInit(): void {
    this.fetchOnlineDevices();
  }

  fetchOnlineDevices(){
    this.api.getQuery('getPcs').subscribe((response: any) => {
      this.data=response
      this.filterBySpecs(this.data._id)
    });
  }

  filterBySpecs(data : any){
    const _tempWorkstations: any[] = [];
    const _tempServers: any[] =  [];
    _.values(data).forEach(ip  => {
      console.log(ip)
      if (this.dirs.workstations.includes(ip)){
        _tempWorkstations.push(ip);
      } else if (this.dirs.servers.includes(ip)){
        _tempServers.push(ip)
      }
    })

    this.servers = _.clone(_tempServers);
    this.workstations = _.clone(_tempWorkstations);
    console.log(this.servers)
  }

}
