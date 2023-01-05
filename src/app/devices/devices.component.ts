import {Component, OnInit} from '@angular/core';
import {ApiConectionService} from "../services/api-conection.service"
import dirs from "/src/assets/";
import * as _ from "lodash";
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.sass']
})
export class DevicesComponent implements OnInit{
  isCollapsed = true;

  data = { _id: []};
  servers = [];
  workstations = [];

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
    const _tempServers: any[] = [];
    _.values(data).forEach(ip  => {
      console.log(ip)
      if (dirs.workstations.includes(ip)){
        _tempWorkstations.push(ip);
      } else if (dirs.servers.includes(ip)){
        _tempServers.push(ip)
      }
    })

    this.servers = _.clone(_tempServers);
    this.workstations = _.clone(_tempWorkstations);
    console.log(this.servers)
  }

}
