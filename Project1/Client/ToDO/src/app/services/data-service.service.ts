import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) {}
//provite data to dashboard
  data: any;

  url = 'http://localhost:8080/';
  //get data get
  getData() {
    return this.http.get(`${this.url}users`);
  }
  //update
  updateData(taskId:any,data: any) {
    return this.http.put(`${this.url}update/${taskId}`, data);
  }
  // save data
  saveData(data: any) {
    return this.http.post("http://localhost:8080/save", data);
  }
  // delete
  deleteData(data: any) {
    return this.http.delete(`http://localhost:8080/delete/${data}`);
  }
}
