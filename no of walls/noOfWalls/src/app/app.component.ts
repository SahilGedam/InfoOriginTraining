import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'noOfWalls';
  inputWalls = '';
  wallsArray: any;
  wallsArrayPercent: any;
  displayErrorMessage = '';
  wallsForLeftPerson: any[] = [];
  wallsForRightPerson: any[] = [];
  maxNumberOfArray: any;
  clicked = false;
  registerFn(data: any) {
    if (data) {
      this.clearAll();
      this.inputWalls = data;

      this.generateNumberArray();
      this.checkNoOfWalls();
    } else {
      this.displayErrorMessage = 'Please Enter a Input';
    }
  }

  generateNumberArray() {
    // this.wallsArray = this.inputWalls.split('#');

    // this.wallsArray = this.wallsArray.map((item: string) => {
    //   if (Number.isNaN(item)) {
    //     this.displayErrorMessage = 'enter proper input';
    //     throw new Error('not a number');
    //   } else {
    //     return parseFloat(item);
    //   }
    // });
    // this.maxNumberOfArray = Math.max.apply(null, this.wallsArray);
    // console.log(this.maxNumberOfArray);
    // this.numberArrayToPercentageArray();
    this.inputWalls = this.inputWalls.replaceAll(',', 'a');
    this.inputWalls = this.inputWalls.replaceAll('#', ',');
    console.log(this.inputWalls);

    try {
      this.wallsArray = JSON.parse('[' + this.inputWalls + ']');
    } catch (error) {
      this.displayErrorMessage =
        'enter proper input only using numbers and # in format  - number # number # number';
    }
    this.wallsArray.map((item: number) => {
      if (item < 1) {
        this.displayErrorMessage = 'Building cannot be less of height 1 meter';
      }
    });
    this.maxNumberOfArray = Math.max.apply(null, this.wallsArray);
    this.numberArrayToPercentageArray();
  }
  numberArrayToPercentageArray() {
    this.wallsArrayPercent = this.wallsArray.map((item: number) => {
      return (item / this.maxNumberOfArray) * 100;
    });
    console.log(this.wallsArray);
  }
  clearAll() {
    this.wallsArray = [];
    this.wallsForLeftPerson = [];
    this.wallsForRightPerson = [];
    this.inputWalls = '';
    this.displayErrorMessage = '';
  }
  checkNoOfWalls() {
    let biggest1 = 0;
    for (let index = 0; index < this.wallsArray.length; index++) {
      const element = this.wallsArray[index];
      if (element > biggest1) {
        biggest1 = element;
        this.wallsForLeftPerson.push({ index: index, element: biggest1 });
      }
    }
    // console.log(this.wallsForLeftPerson);
    let biggest2 = 0;
    for (let index = this.wallsArray.length - 1; index >= 0; index--) {
      const element = this.wallsArray[index];
      if (element > biggest2) {
        biggest2 = element;
        this.wallsForRightPerson.push({ index: index, element: biggest2 });
      }
    }
    // console.log(this.wallsForRightPerson);
  }
}
