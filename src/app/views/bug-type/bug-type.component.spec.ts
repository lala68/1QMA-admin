import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTypeComponent } from './bug-type.component';

describe('BugTypeComponent', () => {
  let component: BugTypeComponent;
  let fixture: ComponentFixture<BugTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
