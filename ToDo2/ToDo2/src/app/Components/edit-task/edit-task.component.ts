import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent {
  taskRegex = /^.*[a-zA-Z].*$/;
  taskId: any;
  previousTask: any = '';
  time: any;
  status: any;
  data: any;
  constructor(
    private dataservice: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.time = this.activatedRoute.snapshot.paramMap.get('time');
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.previousTask = this.activatedRoute.snapshot.paramMap.get('task');
    this.form.task = this.previousTask;
  }
  form = {
    task: '',
  };

  //validate input
  validateInput() {
    if (this.form.task != '' && /[a-zA-Z]/.test(this.form.task)) {
      return true;
    } else {
      return false;
    }
  }
  registerFn() {
    console.log(this.taskId);
    let validForm = this.validateInput();
    if (validForm) {
    // let taskSent = {
    //   task: this.form.task,
    // };
    let taskSent = {
      id: this.taskId,
      task: this.form.task,
      time: this.time,
      status: true,
    };
    console.log(this.form.task);
    console.log('in edit component');

    this.dataservice.updateData(this.taskId, taskSent).subscribe(
      (data) => {
        console.log(data);

        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
        // alert("duplicate entries not allowed")
      }
    );
  } else {
    alert('enter proper input');
  }
  }
  clearFn() {
    this.form.task = '';
  }
}
