import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountTypesComponent } from './list-account-types.component';

describe('ListAccountTypesComponent', () => {
  let component: ListAccountTypesComponent;
  let fixture: ComponentFixture<ListAccountTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccountTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccountTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
