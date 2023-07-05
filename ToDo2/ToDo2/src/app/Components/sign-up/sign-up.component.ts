import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  bootStrapClass = '';
  validInput = false;
  clickedSubmit = false;
  availableUserName: any;
  displayMessage = '';
  suggestedUserName: any;
  form = {
    fname: '',

    lname: '',

    password: '',

    repassword: '',

    email: '',

    username: '',
  };
  lettersRegex = /^[A-Za-z]+$/;
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
      this.form.email != '' &&
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        this.form.email
      ) &&
      this.availableUserName &&
      this.validatedConfirmPassword() &&
      this.form.username != '' &&
      this.form.fname != '' &&
      this.form.lname != '' &&
      this.form.password != '' &&
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
        this.form.password
      )
    ) {
      this.validInput = true;
    } else {
      this.validInput = false;
    }
  }
  validatedConfirmPassword() {
    if (this.form.password === this.form.repassword) {
      return true;
    } else {
      return false;
    }
  }
  selectUserNameButton(data: any) { // selects userName from select to userName field
    this.form.username = data;
  }
  checkAvailable() { // api to check if userName is available
    let userName = this.form.username;
    this.dataservice.checkAvailable(userName).subscribe(
      (data) => {
        this.availableUserName = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserNameSuggestion() { // suggests userName from firstName and lastName
    let firstName = this.form.fname;
    let lastName = this.form.lname;
    if (firstName && lastName) {
      this.dataservice.getUserNameSuggestion(firstName, lastName).subscribe(
        (data) => {
          this.suggestedUserName = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  registerFn() {
    this.clickedSubmit = true;

    this.validateInput();

    let userSent = {
      firstName: this.form.fname,
      lastName: this.form.lname,
      password: this.form.password,
      email: this.form.email,
      userName: this.form.username,
    };

    if (this.validInput) {
      this.dataservice.saveUser(userSent).subscribe(
        (data) => {
          this.navigatelogin();
        },
        (error) => {
          console.log(error);

          this.displayMessage = 'some in submitting form';
        }
      );
    }
  }
  navigatelogin() {
    this.router.navigate(['/login']);
  }
}
