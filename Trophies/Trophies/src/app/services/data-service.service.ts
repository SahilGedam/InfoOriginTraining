import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/';
  // get all cities

  getAllCities() {
    return this.http.get(`${this.url}cities/cities`);
  }
  getQuestionByCityAndIndex(data1: any, data2: any) {
    return this.http.get(`${this.url}questions/questionCity/${data1}/${data2}`);
  }
  saveAnswer(data1: any, data2: any, data3: any) {
    return this.http.put(
      `${this.url}questions/updateStatus/${data1}/${data2}/${data3}`,
      null
    );
  }

  resetAll() {
    return this.http.put(`${this.url}questions/reset`, null);
  }
  updateStatusOfCity(data: any) {
    return this.http.put(`${this.url}questions/updateStatusOfCity/${data}`, null);
  }
}
