import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit,OnChanges {
  taskList: any;
  constructor(
    private dataservice: DataServiceService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes,"  changes");
    
    this.getTaskList();
  }

  ngOnInit(): void {
    console.log("on initialization");
    this.getTaskList();
  }
  getTaskList() {
    this.dataservice.getData().subscribe((data) => {
      this.taskList = data;
      console.log(data);
    });

    console.log(this.taskList,"         task list");
  }
  updateTask(data: any,data2:any): void {
    console.log('updateTask');

    this.router.navigate([`/edit/${data}/${data2}`]);
  }
  deleteTask(data: any): void {
    this.getTaskList();
    console.log(data);

    this.dataservice.deleteData(data).subscribe((data: any) => {
      this.getTaskList();
      console.log(data);
    },
    (error)=>{
      console.log(error);
      this.getTaskList();
    }

    );
    console.log('deleteTask');
    console.log(data);
    this.getTaskList();
  }

  // input box functions below

  form = {
    task: '',
  };
  registerFn() {
    this.getTaskList();
    let taskSent = {
      task: this.form.task,
    };
    console.log(this.form.task);
    this.dataservice.saveData(taskSent).subscribe((data) => {
      this.getTaskList();
      console.log(data);
      if(data!=null){
        alert("duplicate entries not allowed")
      }
      
    }
    ,
    (error)=>{
      alert("duplicate entries not allowed")
      console.log(error);
      this.getTaskList();
    }
    );

    this.getTaskList();
  }
  clearFn() {
    this.getTaskList();
    this.form.task = '';
  }
}
