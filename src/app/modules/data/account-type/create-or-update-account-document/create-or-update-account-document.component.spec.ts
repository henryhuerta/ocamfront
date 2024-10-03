import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateAccountDocumentComponent } from './create-or-update-account-document.component';

describe('CreateOrUpdateAccountDocumentComponent', () => {
  let component: CreateOrUpdateAccountDocumentComponent;
  let fixture: ComponentFixture<CreateOrUpdateAccountDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateAccountDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateAccountDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
