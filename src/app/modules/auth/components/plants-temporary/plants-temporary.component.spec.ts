import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsTemporaryComponent } from './plants-temporary.component';

describe('PlantsTemporaryComponent', () => {
  let component: PlantsTemporaryComponent;
  let fixture: ComponentFixture<PlantsTemporaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsTemporaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsTemporaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
