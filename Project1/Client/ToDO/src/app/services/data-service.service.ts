import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor() {}

  data = [
    { id: 1, task: 'task111111111111111111111111111111111111' },
    { id: 2, task: '111111111111111111111111111111' },
    { id: 3, task: 'tkjcsdcsd111111111111111111111' },
    { id: 4, task: 'vinsdivlshvnilsu1111111111111111111' },
    {
      id: 5,
      task: 'vinsdivlshvnilsu11111111111sdvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv11111111',
    },
  ];
}
