import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-collaborate',
  templateUrl: './collaborate.component.html',
  styleUrls: ['./collaborate.component.css'],
})
export class CollaborateComponent implements OnInit {
  collabTask: any;
  // bootstrap class for input
  bootStrapClass = '';
  alertMessage = '';
  userName: any;
  allUserNames: any;
  totalSeconds: any;
  clickedSubmit = false;
  form = {
    collabHours: 0,
    collabMinutes: 0,
    partnerName: '',
  };
  constructor(
    private dataservice: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.collabTask = this.activatedRoute.snapshot.paramMap.get('task');
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName');
    this.getAllUserNames();
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

  validateInput() {
    if (
      this.form.partnerName != '' &&
      this.totalSeconds > 0 &&
      this.totalSeconds <= 28800 &&
      this.form.collabHours >= 0 &&
      this.form.collabMinutes >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  registerFn() {
    this.clickedSubmit = true;
    this.totalSeconds =
      this.form.collabHours * 3600 + this.form.collabMinutes * 60;
   
    let requestSent = {
      senderName: this.userName,
      receiverName: this.form.partnerName,
      requestedTime: this.totalSeconds,
      taskName: this.collabTask,
    
    };

   
    if (this.validateInput()) {
      this.dataservice.createRequest(requestSent).subscribe(
        (data) => {
        
          this.router.navigate(['home']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.alertMessage = 'enter proper input';
    }
  }
  getAllUserNames() {
    this.dataservice.getAllUserNames().subscribe(
      (data) => {
      
        this.allUserNames = data;
        this.removeUserNameFromArray();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  removeUserNameFromArray() {
    this.allUserNames = this.allUserNames.filter((value: any) => {
      return value !== this.userName;
    });
  }
  clearFn(){
    this.alertMessage='';
  }
}
