import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoresComponent } from './sponsores.component';

describe('SponsoresComponent', () => {
  let component: SponsoresComponent;
  let fixture: ComponentFixture<SponsoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
