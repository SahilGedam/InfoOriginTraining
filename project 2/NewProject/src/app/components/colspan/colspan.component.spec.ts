import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColspanComponent } from './colspan.component';

describe('ColspanComponent', () => {
  let component: ColspanComponent;
  let fixture: ComponentFixture<ColspanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColspanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColspanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
