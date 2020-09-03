import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMyResumeComponent } from './create-my-resume.component';

describe('CreateMyResumeComponent', () => {
  let component: CreateMyResumeComponent;
  let fixture: ComponentFixture<CreateMyResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMyResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMyResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
