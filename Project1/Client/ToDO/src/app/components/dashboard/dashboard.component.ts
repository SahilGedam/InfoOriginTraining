import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // tasks stored in taskList
  taskList: any;
  constructor(
    private dataservice: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('on initialization');
    this.getTaskList();
  }
  // function to fetch tasks
  getTaskList() {
    this.dataservice.getData().subscribe((data) => {
      this.taskList = data;
      console.log(data);
    });

    console.log(this.taskList, '         task list');
  }
  //route to update task
  updateTask(data: any, data2: any): void {
    console.log('updateTask');

    this.router.navigate([`/edit/${data}/${data2}`]);
  }
  //delete task
  deleteTask(data: any): void {
    // this.getTaskList();
    console.log(data);

    this.dataservice.deleteData(data).subscribe(
      (data: any) => {
        console.log('code reached without error in deleteData');

        this.getTaskList();
        console.log(data);
      },
      (error) => {
        console.log('error while deleting');

        console.log(error);
        this.getTaskList();
      }
    );
    console.log('deleteTask');
    console.log(data);
    console.log('code reached at line 54');

    this.getTaskList();
  }

  // input box functions below

  form = {
    task: '',
  };
  // function to save data to database
  registerFn() {
    let taskSent = {
      task: this.form.task,
    };
    console.log(this.form.task);
    this.dataservice.saveData(taskSent).subscribe(
      (data) => {
        this.getTaskList();
        console.log(data);
        console.log('data entered successfully');
      },
      (error) => {
        alert('duplicate entries not allowed');
        console.log('called from error');

        console.log(error);
      }
    );
    console.log('code reachable ata line 88');
    this.getTaskList();
  }
  // clear the input box
  clearFn() {
    this.form.task = '';
  }
}
