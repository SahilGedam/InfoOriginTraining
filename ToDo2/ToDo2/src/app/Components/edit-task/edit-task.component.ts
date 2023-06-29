import { Component, HostListener } from '@angular/core';
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
  displayMessage: string = '';
  // bootstrap class for input
  bootStrapClass = '';

  form = {
    task: '',
  };
  constructor(
    private dataservice: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.previousTask = this.activatedRoute.snapshot.paramMap.get('task');
    this.form.task = this.previousTask;
    this.darkModeToggle();
  }
  //inject bootstrap classes in the view
  @HostListener('window:change') darkModeToggle() {
    if (!this.dataservice.colorMode) {
      this.bootStrapClass = '';
    } else if (this.dataservice.colorMode) {
      this.bootStrapClass = 'text-white bg-dark';
    }
  }

  //validate input
  validateInput() {
    if (this.form.task != '' && /[a-zA-Z]/.test(this.form.task)) {
      return true;
    } else {
      return false;
    }
  }
  registerFn() {
    let validForm = this.validateInput();
    if (validForm) {
      let taskSent = {
        id: this.taskId,
        task: this.form.task,
      };

      this.dataservice.updateData(this.taskId, taskSent).subscribe(
        (data) => {
          this.router.navigate(['']);
        },
        (error) => {
          this.displayMessage = 'duplicate entries not allowed';
        }
      );
    } else {
      this.displayMessage = 'enter proper input';
    }
  }
  clearFn() {
    this.form.task = '';
    this.displayMessage = '';
  }
}
