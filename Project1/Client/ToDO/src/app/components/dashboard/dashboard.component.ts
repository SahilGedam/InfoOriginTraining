import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dataservice: DataServiceService , private router : Router) {}

  ngOnInit(): void {
    this.taskList = this.dataservice.data;
    console.log(this.taskList);
  }
  taskList: any;
  updateTask(data: any): void {
    console.log('updateTask');
    // console.log(data);
    // this.dataservice.data.splice(data);
    this.router.navigate([`/edit/${data}`]);
  }
  deleteTask(data: any): void {
    console.log('deleteTask');
    console.log(data);
    this.dataservice.data.splice(data);
  }
}
