import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  allTrophies: any;
  selectedCity: string = '';
  congratulationsMessage: string = '';
  ngOnInit(): void {
    this.getAllTrophies();
  }
  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  getAllTrophies() {
    this.dataService.getAllCities().subscribe(
      (data) => {
        this.allTrophies = data;
        this.checkAllCompleted();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  checkAllCompleted() {
    let completedTrophies = 0;
    this.allTrophies.map((data: any) => {
      if (data.status == 'completed') {
        completedTrophies++;
      }
    });
    if (completedTrophies == 9) {
      this.congratulationsMessage = 'CONGRATULATION COMPLETED ALL TROPHIES';
      console.log(completedTrophies);
    }
  }
  resetAll() {
    this.congratulationsMessage = '';
    this.dataService.resetAll().subscribe(
      (data) => {
        this.getAllTrophies();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  navigateByDiv(data: any) {
    this.selectedCity = data;
    this.routeToQuiz();
  }
  routeToQuiz() {
    this.router.navigate([`/quiz/${this.selectedCity}`]);
  }
}
