import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardQuestionsComponent } from './wizard-questions.component';

describe('WizardQuestionsComponent', () => {
  let component: WizardQuestionsComponent;
  let fixture: ComponentFixture<WizardQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WizardQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
