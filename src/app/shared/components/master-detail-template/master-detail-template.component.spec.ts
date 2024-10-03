import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailTemplateComponent } from './master-detail-template.component';

describe('MasterDetailTemplateComponent', () => {
  let component: MasterDetailTemplateComponent;
  let fixture: ComponentFixture<MasterDetailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterDetailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
