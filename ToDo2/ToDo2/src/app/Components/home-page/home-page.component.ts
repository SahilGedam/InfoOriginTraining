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

  //validating Date
  validDate: any;
  // to check if submit is clicked
  clickedSubmit: any;

  // get all collaboratin requests
  collabRequests: any;
  // tottal request to show at notification
  totalRequests=0;

  currentDate = new Date().toISOString().split('T')[0];

  displayMessage: string = '';
  displayMessageError: string = '';
  // bootstrap class for input
  bootStrapClass = '';
  // bootstrap class for table
  bootStrapTableClass = '';
  userName: string = '';
  userId: number = 0;
  // full details of a user
  userDetails: any;
  acceptedRequests: any;
  rejectedRequests: any;

  // task Form
  form = {
    task: '',
    time: '',
  };
  taskRegex = /^.*[a-zA-Z].*$/;
  constructor(
    private dataservice: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form.time = new Date().toISOString().split('T')[0];
    this.darkModeToggle();
    this.getUserName();
    this.getTaskList();
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
    this.checkRequests(); // calls checkRequests only after getting userName
  }
  checkRequests() {
    this.dataservice.checkRequests(this.userName).subscribe(
      (data) => {
    
        this.collabRequests=data;
        this.totalRequests=this.collabRequests.length+this.totalRequests;
       this.showPendingRequestsOnly()
        
      },
      (error) => {
        console.log(error);
      }
    );
    this.dataservice
    .checkRequestsByStatus(this.userName, 'Accepted')
    .subscribe((data) => {
      this.acceptedRequests = data;
      this.totalRequests=this.acceptedRequests.length+this.totalRequests;
      console.log(this.acceptedRequests);
      
    });
  this.dataservice
    .checkRequestsByStatus(this.userName, 'Rejected')
    .subscribe((data) => {
      this.rejectedRequests = data;
      this.totalRequests=this.rejectedRequests.length+this.totalRequests;
    });
  }
  showPendingRequestsOnly(){
    this.collabRequests = this.collabRequests.filter((value: any)=>{
      return value.status == 'Pending';
    })
    this.totalRequests=this.collabRequests.length;

  }

    // fetch all tasks
    getTaskList() {
  
      this.dataservice.getTasksById(this.userId).subscribe(
        (data) => {
          this.taskList = data;
       
        },
        (error) => {
          console.log(error);
        }
      );
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
  logout() {
    localStorage.setItem('userDetails', JSON.stringify(null));
    this.router.navigate(['/login']);
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
          if (data == "Task Added Succesfully"){

            this.displayMessage = data;
          }else{
            this.displayMessageError = 'Duplicate Tasks not allowed';
          }
    
        },
        (error) => {
          // this.displayMessageError = 'Duplicate Tasks not allowed';
          console.log(error);
        }
      );
    } else {
      this.displayMessageError = 'Enter Proper Input';
    }
  }
  // clear the input box
  clearFn() {
    this.form.task = '';
    this.clickedSubmit = false;
    this.form.time = this.currentDate;
    this.displayMessage = '';
    this.displayMessageError = '';
  }

  // input box ends above

  // dashboard code below



  // for buttons in table
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
  //route to update task
  collabTask(data: any , data2: any): void {
    this.router.navigate([`/colaborate/${data}/${data2}/${this.userName}`]);
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
   // route to requests
   requestsNavigate(){
    this.router.navigate([`/requests/${this.userName}`])
  }
}
