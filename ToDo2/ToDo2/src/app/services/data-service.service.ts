import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) {}

  colorMode: boolean = false;
  // for adding bootstrap classes
  toggleColorMode() {
    this.colorMode = !this.colorMode;
  }

  //get data get
  url = 'http://localhost:8080/';
  //get data get
  getData() {
    return this.http.get(`${this.url}tasks`);
  }
  //update
  updateData(taskId: any, data: any) {
    return this.http.put(`${this.url}update/${taskId}`, data);
  }
  // save data
  saveData(data: any) {
    return this.http.post(`${this.url}save`, data);
  }
  // delete
  deleteData(data: any) {
    return this.http.delete(`${this.url}delete/${data}`);
  }
  //completeTask
  completeTask(taskId: any, data: any) {
    return this.http.put(`${this.url}complete/${taskId}`, data);
  }
}
