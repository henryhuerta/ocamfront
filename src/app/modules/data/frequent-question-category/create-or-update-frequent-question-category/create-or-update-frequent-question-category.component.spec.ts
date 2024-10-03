import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateFrequentquestioncategoryComponent } from './create-or-update-frequent-question-category.component';

describe('CreateOrUpdateFrequentquestioncategoryComponent', () => {
  let component: CreateOrUpdateFrequentquestioncategoryComponent;
  let fixture: ComponentFixture<CreateOrUpdateFrequentquestioncategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateFrequentquestioncategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateFrequentquestioncategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
