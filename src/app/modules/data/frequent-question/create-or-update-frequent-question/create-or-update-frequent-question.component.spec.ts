import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateFrequentQuestionComponent } from './create-or-update-frequent-question.component';

describe('CreateOrUpdateFrequentQuestionComponent', () => {
  let component: CreateOrUpdateFrequentQuestionComponent;
  let fixture: ComponentFixture<CreateOrUpdateFrequentQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateFrequentQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateFrequentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
