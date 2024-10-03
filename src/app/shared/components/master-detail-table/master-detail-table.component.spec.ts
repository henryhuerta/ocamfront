import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailTableComponent } from './master-detail-table.component';

describe('MasterDetailTableComponent', () => {
  let component: MasterDetailTableComponent;
  let fixture: ComponentFixture<MasterDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
