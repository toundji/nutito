import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministratorFormComponent } from './create-administrator-form.component';

describe('CreateAdministratorFormComponent', () => {
  let component: CreateAdministratorFormComponent;
  let fixture: ComponentFixture<CreateAdministratorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdministratorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdministratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
