import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title : string= 'NewProject'
  numberArray: number[] = [];

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
    this.numbersArrayColsPan = JSON.parse('[' + this.form.colspan + ']');
  }
  clear(){
    this.colspanTwoDarray=[]
    this.numbersArrayColsPan=[]
    this.numberArray=[]
   
  }

  generateComponents() {
    this.generateNumberArray();
    console.log(this.numbersArrayColsPan);

    this.numberArray = Array(this.form.noOfInputs)
      .fill(0)
      .map((x, i) => i);

      this.colsArrayForRows= Array(this.form.colsPerRow)
      .fill(0)
      .map((x, i) => i);

    let max = this.form.colsPerRow;
    let sum = 0;
    let tempArray: any[] = [];

    for (let index = 0; index < this.numbersArrayColsPan.length; index++) {
      let element = this.numbersArrayColsPan[index];
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
