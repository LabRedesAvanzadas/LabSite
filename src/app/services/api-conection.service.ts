import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiConectionService {
  url = 'http://200.126.14.228:8800/';
  constructor(private http:HttpClient) { }
  getQuery(dire : string): any {
    return this.http.get(this.url+dire)
  }
}
