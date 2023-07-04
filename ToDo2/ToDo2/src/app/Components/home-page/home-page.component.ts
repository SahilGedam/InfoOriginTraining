import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  // tasks stored in taskList
  taskList: any;
  //regex
  taskRegex = /^.*[a-zA-Z].*$/;
  //validating Date
  validDate: any;
  // to check if submit is clicked
  clickedSubmit: any;

  currentDate = new Date().toISOString().split('T')[0];

  displayMessage: string = '';
  // bootstrap class for input
  bootStrapClass = '';
  // bootstrap class for table
  bootStrapTableClass = '';
  userName: string = '';
  userId: number = 0;
  userDetails: any;

  // task Form
  form = {
    task: '',
    time: '',
  };
  constructor(
    private dataservice: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.getTaskList();
    this.form.time = new Date().toISOString().split('T')[0];
    this.darkModeToggle();
  }

  //inject bootstrap classes in the view
  @HostListener('window:change') darkModeToggle() {
    if (!this.dataservice.colorMode) {
      this.bootStrapClass = '';
      this.bootStrapTableClass = '';
    } else if (this.dataservice.colorMode) {
      this.bootStrapClass = 'text-white bg-dark';
      this.bootStrapTableClass = 'table-dark';
    }
  }

  getUserName() {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(this.userDetails);
 
    this.userId = this.userDetails.userid;
    this.userName = this.userDetails.userName;
 
  }
  logout() {
  
    localStorage.setItem('userDetails', JSON.stringify(null))
    this.router.navigate(['/login']);
  }

  // functions of Input Box
  // check all validations
  validateInput() {
    if (
      this.form.task != '' &&
      this.form.time != '' &&
      !this.validDate &&
      /[a-zA-Z]/.test(this.form.task)
    ) {
      return true;
    } else {
      return false;
    }
  }
  // validate Date
  validateDate() {
    if (this.form.time >= this.currentDate) {
      return false;
    } else {
      return true;
    }
  }
  // register Task to TaskService
  registerFn() {
    this.clickedSubmit = true;

    // check if inputs are valid
    // validate date
    this.validDate = this.validateDate();
    // validate task input and date
    let validForm = this.validateInput();

    if (validForm) {
      let taskSent = {
        task: this.form.task,
        time: this.form.time,
        status: true,
        userId: this.userId,
      };

      this.dataservice.saveData(taskSent).subscribe(
        (data) => {
          this.getTaskList();
          this.displayMessage = 'Task Entered Successfully';
          console.log(data);
        },
        (error) => {
          this.displayMessage = 'Duplicate Tasks not allowed';
          console.log(error);
        }
      );
    } else {
      this.displayMessage = 'Enter Proper Input';
    }
  }
  // clear the input box
  clearFn() {
    this.form.task = '';
    this.clickedSubmit = false;
    this.form.time = this.currentDate;
    this.displayMessage = '';
  }

  // input box ends above

  // dashboard code below

  // fetch all tasks
  getTaskList() {

    console.log(this.userId);
    this.dataservice.getTasksById(this.userId).subscribe((data) => {
      
      this.taskList = data;
      console.log(data);
      
    },(error)=>{
      console.log(error);
      
    });
 
  }
  // update if task is completed
  completeTask(data: any) {
    this.dataservice.completeTask(data.id).subscribe(
      (data) => {
        this.getTaskList();
      },
      (error) => {
        this.getTaskList();
      }
    );
  }
  //route to update task
  updateTask(data1: any, data2: any): void {
    this.router.navigate([`/edit/${data1}/${data2}`]);
  }
  //delete task
  deleteTask(data: any): void {
    this.dataservice.deleteData(data).subscribe(
      (data: any) => {
        this.getTaskList();
      },
      (error) => {
        this.getTaskList();
      }
    );
  }
}
