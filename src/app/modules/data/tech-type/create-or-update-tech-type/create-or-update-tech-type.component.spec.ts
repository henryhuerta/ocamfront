import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrUpdateTechTypeComponent } from './create-or-update-techtype.component';


describe('CreateOrUpdateTechTypeComponent', () => {
  let component: CreateOrUpdateTechTypeComponent;
  let fixture: ComponentFixture<CreateOrUpdateTechTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateTechTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateTechTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
