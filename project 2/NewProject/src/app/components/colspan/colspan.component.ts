import { Component } from '@angular/core';

@Component({
  selector: 'app-colspan',
  templateUrl: './colspan.component.html',
  styleUrls: ['./colspan.component.css']
})
export class ColspanComponent {
  numberArray: number[] = [];
  displayErrorMessage = '';
  numbersArrayColsPan: any[] = [];
  colspanTwoDarray: any[] = [];
  colsArrayForRows: any[] = [];

  form = {
    noOfInputs: 0,
    colsPerRow: 0,
    colspan: '',
  };

  ngOnInit(): void {}

  generateNumberArray() {
    try {
      this.numbersArrayColsPan = JSON.parse('[' + this.form.colspan + ']');
    } catch (error) {
      this.displayErrorMessage =
        'enter proper input only using numbers and comma in format  - number , number, number';
    }
  }
  clear() {
 
    this.form.colsPerRow = 0;
    this.form.noOfInputs = 0;
    this.form.colspan = '';
    this.colspanTwoDarray = [];
    this.numbersArrayColsPan = [];
    this.colsArrayForRows = [];
    this.numberArray = [];
    this.displayErrorMessage = '';
  }
  clearOutPutOnChange() {
    this.colspanTwoDarray = [];
    this.numbersArrayColsPan = [];
    this.numberArray = [];
    this.displayErrorMessage = '';
  }
  checkErrorsFn(element: any, max: any) {
    if (this.form.colsPerRow < 1) {
      this.displayErrorMessage = 'colspan per row cannot be less than one';
    } else if (element < 1) {
      this.displayErrorMessage = 'colspan cannot be less than one';
    } else if (element > max) {
      this.displayErrorMessage =
        'input colspan number is greater than max cols per row';
    } else if (this.form.noOfInputs != this.numbersArrayColsPan.length) {
      this.displayErrorMessage =
        'no of input and no of colspan input does not match';
    }
  }

  generateComponents(data: any): void {
    this.form.colspan = data.colspan;
    this.form.noOfInputs = data.noOfInputs;
    this.form.colsPerRow = data.colsPerRow;
    this.colspanTwoDarray = [];
  
    let max = this.form.colsPerRow;
    let sum = 0;
    let tempArray: any[] = [];

    this.generateNumberArray();
 
    try {
      this.numberArray = Array(this.form.noOfInputs)
        .fill(0)
        .map((x, i) => i);

      this.colsArrayForRows = Array(this.form.colsPerRow)
        .fill(0)
        .map((x, i) => i);
    } catch (error) {
      console.log(error);
    }

    for (let index = 0; index < this.numbersArrayColsPan.length; index++) {
      let element = this.numbersArrayColsPan[index];
      this.checkErrorsFn(element, max);

      if (sum >= max) {
        this.colspanTwoDarray.push(tempArray);
        sum = 0;
        tempArray = [];
      } else if (sum + element > max) {
        this.colspanTwoDarray.push(tempArray);
        sum = 0;
        tempArray = [];
      }
      if (index == this.numbersArrayColsPan.length - 1) {
        this.colspanTwoDarray.push(tempArray);
      }

      sum += element;
      tempArray.push(element);
    }
  }
}
