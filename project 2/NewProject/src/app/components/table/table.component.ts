import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  form = {
    noOfInputs: 0,
    colsPerRow: 0,
    rowspan: '',
  };
  numberArraryRowSpan: any[] = [];
  numberArray: number[] = [];
  rowSpanTwoDArray: any[] = [];
  supportArrayForEachCols: any[] = [];
  displayErrorMessage = '';
  largestNumberOfInputs = 0;
  clear() {
    this.rowSpanTwoDArray = [];
    this.form.noOfInputs = 0;
    this.form.colsPerRow = 0;
    this.form.rowspan = '';
    this.numberArraryRowSpan = [];
    this.numberArray = [];
    this.supportArrayForEachCols = [];
    this.displayErrorMessage = '';
  }
  clearOutPutOnChange() {
    this.rowSpanTwoDArray = [];
    this.numberArraryRowSpan = [];
    this.numberArray = [];
    this.supportArrayForEachCols = [];
    this.displayErrorMessage = '';
  }
  generateNumberArray() {
    try {
      this.numberArraryRowSpan = JSON.parse('[' + this.form.rowspan + ']');
      this.largestNumberOfInputs = Math.max.apply(0, this.numberArraryRowSpan);
    } catch (error) {
      this.displayErrorMessage =
        'enter proper input only using numbers and comma in format  - number , number, number';
    }
  }
  checkErrorsFn(element: any) {
    if ((this.form.rowspan = '')) {
      this.displayErrorMessage = 'enter input';
    } else if (element < 0) {
      this.displayErrorMessage = 'rowspan must be greater than 0';
    } else if (this.form.colsPerRow < 1) {
      this.displayErrorMessage = 'colsPerRow must be greater than 0';
    } else if (this.form.noOfInputs < 1) {
      this.displayErrorMessage = 'no of input cannot be less than 1';
    } else if (this.form.noOfInputs != this.numberArraryRowSpan.length) {
      this.displayErrorMessage = 'no of input and rowspan input does not match';
    }
  }
  generateComponents(data: any): void {
    this.rowSpanTwoDArray = [];
    this.form.noOfInputs = data.noOfInputs;
    this.form.colsPerRow = data.rowsPerCol;
    this.form.rowspan = data.rowspan;
    let max = this.form.colsPerRow;
    this.generateNumberArray();
    if(this.form.rowspan==''){
      this.displayErrorMessage='please enter a proper input'
    }
    try {
      this.numberArray = Array(this.form.noOfInputs)
        .fill(0)
        .map((x, i) => i);
      this.supportArrayForEachCols = Array(this.largestNumberOfInputs)
        .fill(0)
        .map((x, i) => i);
      this.supportArrayForEachCols.pop();
    } catch (error) {
      console.log(error);
    }
    let tempArray: any[] = [];
    for (let index = 0; index < this.numberArraryRowSpan.length; index++) {
      let element = this.numberArraryRowSpan[index];
      this.checkErrorsFn(element);
      tempArray.push(element);
      if (tempArray.length == max) {
        this.rowSpanTwoDArray.push(tempArray);
        tempArray = [];
      }
      if (
        index == this.numberArraryRowSpan.length - 1 &&
        tempArray.length > 0
      ) {
        this.rowSpanTwoDArray.push(tempArray);
        tempArray = [];
      }
    }
  }
}
