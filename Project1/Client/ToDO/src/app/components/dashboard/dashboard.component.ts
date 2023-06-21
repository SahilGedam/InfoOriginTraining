import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dataservice: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }
  taskList: any;
  getTaskList() {
    this.dataservice.getData().subscribe((data) => {
      this.taskList = data;
    });
    console.log(this.taskList);
  }
  updateTask(data: any): void {
    console.log('updateTask');

    this.router.navigate([`/edit/${data}`]);
  }
  deleteTask(data: any): void {
    console.log(data);

    this.dataservice.deleteData(data).subscribe((data: any) => {
      console.log(data);
    });
    console.log('deleteTask');
    console.log(data);
    this.getTaskList();
  }
}
