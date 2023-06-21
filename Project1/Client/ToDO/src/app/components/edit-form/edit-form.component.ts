import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  taskId: any;
  previousTask: any = '';
  constructor(
    private dataservice: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.previousTask =
      this.activatedRoute.snapshot.paramMap.get('previousTask');
    this.form.task = this.previousTask;
  }
  form = {
    task: '',
  };
  registerFn() {
    let taskSent = {
      task: this.form.task,
    };
    console.log(this.form.task);

    this.dataservice.updateData(this.taskId, taskSent).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['']);
  }
  clearFn() {
    this.form.task = '';
  }
}
