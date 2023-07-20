import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  cityName: any;
  currentQuestion: any;
  questionOptions: any;
  questionOptionsArray: any[] = [1, 2, 3, 4];
  questionBody = '';
  index = 1;
  selectedOption: any;

  ngOnInit(): void {
    this.cityName = this.activatedRoute.snapshot.paramMap.get('cityName');
    this.getQuestionByCityName();
  }
  constructor(
    private dataservice: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  splitQuestionOptions() {
    try {
      this.questionOptionsArray = this.questionOptions.split(',');
    } catch (error) {
      console.log(error);
    }
  }

  navigateHome() {
    this.updateStatusOfCity();
  }
  onNext() {
    if (this.index < 5) {
      this.index++;
      this.getQuestionByCityName();
    }
  }
  onPrevious() {
    if (this.index > 1) {
      this.index--;
      this.getQuestionByCityName();
    }
  }

  onSave() {
    let answer = this.selectedOption;
    if (answer) {
      this.dataservice.saveAnswer(this.cityName, this.index, answer).subscribe(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
    }

    this.onNext();
  }
  updateStatusOfCity() {
    this.dataservice.updateStatusOfCity(this.cityName).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getQuestionByCityName() {
    this.dataservice
      .getQuestionByCityAndIndex(this.cityName, this.index)
      .subscribe(
        (data) => {
          this.currentQuestion = data;
          this.questionBody = this.currentQuestion.questionBody;
          this.questionOptions = this.currentQuestion.questionOptions;
          this.selectedOption = this.currentQuestion.selected;

          this.splitQuestionOptions();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
