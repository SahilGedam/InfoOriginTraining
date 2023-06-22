import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
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
  form = {
    task: '',
    time: '',
  };
  currentDate = new Date().toISOString().split('T')[0];
  // function to save data to database
  registerFn() {
    console.log(this.form);
    console.log(this.form.time, 'time');

    let taskSent = {
      task: this.form.task,
      time: this.form.time,
      status: true,
    };
    console.log(this.form.task);
    this.dataservice.saveData(taskSent).subscribe(
      (data) => {
        this.getTaskList();
        console.log(data);
        console.log('data entered successfully');
      },
      (error) => {
        // alert('duplicate entries not allowed');
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
    this.form.time = this.currentDate;
  }
  validateDate() {
    if (this.form.time <= this.currentDate) {
      return true;
    } else {
      return false;
    }
  }

  // input box ends above
  // dashboard code below
  // function to fetch tasks

  styleTable = '';

  checkExpired(date: any) {
    if (date <= this.currentDate) {
      // return true;
      this.styleTable='expired'
    } else {
      this.styleTable=''
      // return false;
    }
  }

  getTaskList() {
    this.dataservice.getData().subscribe((data) => {
      this.taskList = data;
      console.log(data);
    });

    console.log(this.taskList, 'task list');
  }
  stylesFunction() {}
  completeTask(data: any) {
    console.log(data);
    let taskSent = {
      id: data.id,
      task: data.task,
      time: data.time,
      status: false,
    };

    this.dataservice.completeTask(data.id, taskSent).subscribe((data) => {
      this.getTaskList();
      console.log(data);
    });
    this.getTaskList();
  }
  //route to update task
  updateTask(data1: any, data2: any, data3: any): void {
    console.log('updateTask');

    this.router.navigate([`/edit/${data1}/${data2}/${data3}`]);
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
}
