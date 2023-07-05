import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = {
    username: '',
    password: '',
  };
  userDetails: any;
  displayMessage = '';
  bootStrapClass = '';
  clickedSubmit = false;
  validInput = false;
  passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  constructor(
    private dataservice: DataServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
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
      this.form.password != '' &&
      this.form.username != '' &&
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
        this.form.password
      )
    ) {
      this.validInput = true;
      return true;
    } else {
      this.validInput = false;
      return false;
    }
  }

  registerFn() {
    this.clickedSubmit = true;
    this.validateInput();
    if (this.validInput) {
      let userName = this.form.username;
      let password = this.form.password;
      this.dataservice.loginUser(userName, password).subscribe(
        (data) => {
          localStorage.setItem('userDetails', JSON.stringify(data));
          this.userDetails = data; // if invalid user -> data returns null
          this.checkUserIsAvailable();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  checkUserIsAvailable() {
    if (this.userDetails) {
      this.navigateHome();
    } else {
      this.displayMessage = 'UserName or Password does not match';
    }
  }
  navigateSignUp() {
    this.router.navigate(['/sign-up']);
  }
  navigateHome() {
    this.router.navigate(['/home']);
  }
}
