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
    return this.http.get(`${this.url}tasks/allTasks`);
  }
  // get tasks by id
  getTasksById(data: any) {
    return this.http.get(`${this.url}tasks/tasksByUser/${data}`);
  }
  //update
  updateData(taskId: any, data: any) {
    return this.http.put(`${this.url}tasks/updateTask/${taskId}`, data);
  }
  // save data
  saveData(data: any) {
    return this.http.post(`${this.url}tasks/saveTask`, data);
  }
  // delete
  deleteData(data: any) {
    return this.http.delete(`${this.url}tasks/deleteTask/${data}`);
  }
  //completeTask
  completeTask(taskId: any) {
    return this.http.put(`${this.url}tasks/completeTask/${taskId}`, null);
  }
  // save user
  saveUser(data: any) {
    return this.http.post(`${this.url}users/saveUser`, data);
  }
  //login user
  loginUser(userName: string, password: string) {
    return this.http.get(`${this.url}users/getUser/${userName}/${password}`);
  }
  // check username available
  checkAvailable(userName: string) {
    return this.http.get(`${this.url}users/checkAvailable/${userName}`);
  }
  // gets
  getUserNameSuggestion(firstName: string, lastName: string) {
    return this.http.get(
      `${this.url}users/suggestUserName/${firstName}/${lastName}`
    );
  }
  // get requests Notifications
  checkRequests(data: any) {
    return this.http.get(`${this.url}users/checkRequests/${data}`);
  }
  //get all user names
  getAllUserNames() {
    return this.http.get(`${this.url}users/allUserNames`);
  }

  // create request
  createRequest(data: any) {
    return this.http.post(`${this.url}users/createRequest`, data);
  }

  // accept request
  acceptRequest(data: any,data2:any) {
    return this.http.put(`${this.url}users/acceptRequest/${data}`,data2,  {  responseType: 'text'});
  }

  // delete request
  deleteRequest(data: any) {
    return this.http.delete(`${this.url}users/deleteRequest/${data}`);
  }
}
