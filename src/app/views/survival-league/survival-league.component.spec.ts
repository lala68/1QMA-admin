import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivalLeagueComponent } from './survival-league.component';

describe('SurvivalLeagueComponent', () => {
  let component: SurvivalLeagueComponent;
  let fixture: ComponentFixture<SurvivalLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurvivalLeagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurvivalLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
