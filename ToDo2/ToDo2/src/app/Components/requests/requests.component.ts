import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  userName: any;
  collabRequests: any[] = [];
  timeStringArray: any;
  displayMessage ='';
  bootStrapClass = ''

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName');
    this.checkRequests();
    this.darkModeToggle();
  }
  constructor(
    private dataservice: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
    //inject bootstrap classes in the view
    @HostListener('window:change') darkModeToggle() {
      if (!this.dataservice.colorMode) {
        this.bootStrapClass = '';
      } else if (this.dataservice.colorMode) {
        this.bootStrapClass = 'text-white bg-dark';
      }
    }
  checkRequests() {
    this.dataservice.checkRequests(this.userName).subscribe(
      (data: any) => {
    
        this.collabRequests = data;
        this.newArrayForTimeString();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newArrayForTimeString() {
    this.timeStringArray = this.collabRequests.map((data: any) => {
      return (data.time = new Date(data.requestedTime * 1000)
        .toISOString()
        .substr(11, 8));
    });

 
  }

  acceptRequest(data: any) {
 
    this.clearMessage()
    
    this.dataservice.acceptRequest(this.userName, data).subscribe(
      (value) => {
   
        if (value == '8 hours completed') {
          // alert(value);
          this.displayMessage ='cannot exceed 8 hours time limit';
        }
        this.checkRequests();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  clearMessage(){
    this.displayMessage='';
  }
  deleteRequest(data: any) {
  
    this.clearMessage()

    this.dataservice.deleteRequest(data).subscribe(
      (value) => {
    
        this.checkRequests();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}