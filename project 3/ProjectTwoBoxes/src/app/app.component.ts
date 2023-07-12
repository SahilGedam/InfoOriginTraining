import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
   
  }

//   ngOnInit(): void {
//     this.checkButtonValid();
//   }

//   constructor() {}
   title = 'ProjectTwoBoxes';
//   box1deActivated = true;
//   box2deActivated = true;
//   anyBoxActivated = false;
//   arrayDataBox1: string[] = [];
//   arrayDataBox2: string[] = [];
//   validBtn1 = false;
//   validBtn2 = false;
//   validBtn3 = false;
//   validBtn4 = false;
//   currentSelectedBox: any;
//   completePercentage = 0;
//   allTasks: string[] = [];
//   taskInput = '';
//   errorMessage = '';
//   allTasksValueUpdate() {
//     this.allTasks = this.arrayDataBox1.concat(this.arrayDataBox2);
//     this.completePercentage = Math.floor((this.allTasks.length / 40) * 100);
//   }

//   activateBoxBySelect(data: any) {
//     this.anyBoxActivated = true;

//     if (data.value == 1) {
//       this.box1deActivated = false;
//       this.currentSelectedBox = '1';
//     } else if (data.value == 2) {
//       this.box2deActivated = false;
//       this.currentSelectedBox = '2';
//     }
//   }
//   checkButtonValid() {
//     if (this.arrayDataBox1.length > 0) {
//       this.validBtn1 = true;
//     } else {
//       this.validBtn1 = false;
//     }
//     if (this.arrayDataBox2.length > 0) {
//       this.validBtn2 = true;
//     } else {
//       this.validBtn2 = false;
//     }
//     if (this.arrayDataBox1.length > 1) {
//       this.validBtn3 = true;
//     } else {
//       this.validBtn3 = false;
//     }
//     if (this.arrayDataBox2.length > 2) {
//       this.validBtn4 = true;
//     } else {
//       this.validBtn4 = false;
//     }
//   }
//   shiftToRight() {
//     let popped = this.arrayDataBox1.pop();
//     this.arrayDataBox2.push(popped);
//     this.checkButtonValid();
//   }
//   shiftToLeft() {
//     let popped = this.arrayDataBox2.pop();
//     this.arrayDataBox1.push(popped);
//     this.checkButtonValid();
//   }
//   shiftEvenFromLastToRight() {
//     let spliced = this.arrayDataBox1.splice(this.arrayDataBox1.length - 2, 2);
//     this.arrayDataBox2 = this.arrayDataBox2.concat(spliced);
//     this.checkButtonValid();
//   }
//   shiftOddFromTopToLeft() {
//     let spliced = this.arrayDataBox2.splice(0, 3);
//     this.arrayDataBox1 = this.arrayDataBox1.concat(spliced);
//     this.checkButtonValid();
//   }
//   clear() {
//     this.errorMessage = '';
//   }

//   registerFn(data: any) {
//     if (
//       this.anyBoxActivated &&
//       /^.*[a-zA-Z].*$/.test(data) &&
//       !this.allTasks.includes(data)
//     ) {
//       if (
//         (this.currentSelectedBox == '1' && this.arrayDataBox1.length < 20) ||
//         (this.arrayDataBox1.length < 20 && this.arrayDataBox2.length == 20)
//       ) {
//         this.arrayDataBox1.push(data);
//       } else if (
//         (this.currentSelectedBox == '2' && this.arrayDataBox2.length < 20) ||
//         (this.arrayDataBox2.length < 20 && this.arrayDataBox1.length == 20)
//       ) {
//         this.arrayDataBox2.push(data);
//       }
//       this.clear();
//       this.allTasksValueUpdate();
//       this.checkButtonValid();
//     } 
//else if (data == '' && this.anyBoxActivated) {
//       this.errorMessage = 'enter task';
//     } else if (this.anyBoxActivated && /^.*[a-zA-Z].*$/.test(data) == false) {
//       this.errorMessage =
//         'task should contain atleast one alphabetic character';
//     } else if (!this.anyBoxActivated) {
//       this.errorMessage = 'activate any one box first';
//     } else if (this.allTasks.includes(data)) {
//       this.errorMessage = 'duplicate tasks not allowed';
//     }
//   }
 }
