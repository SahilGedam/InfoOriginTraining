import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
 
  data = [
    {
      id: 1,
      status: true,
      task: 'hello task',
    },
    {
      id: 1,
      status: true,
      task: 'hello task',
    },
  ];
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/';
  //get data get
  getData() {
    return this.http.get(`${this.url}ToDo/`);
  }
  //update
  updateData(taskId: any, data: any) {
    return this.http.put(`${this.url}ToDo/${taskId}`, data);
  }
  //completeTask
  completeTask(taskId: any, data: any) {
    return this.http.put(`${this.url}ToDo/${taskId}`, data);
  }

  // save data
  saveData(data: any) {
    return this.http.post(`${this.url}ToDo/`, data);
  }
  // delete
  deleteData(data: any) {
    return this.http.delete(`${this.url}ToDo/${data}`);
  }
}
