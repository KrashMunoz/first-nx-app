import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdTryComponent } from './third-try.component';

describe('ThirdTryComponent', () => {
  let component: ThirdTryComponent;
  let fixture: ComponentFixture<ThirdTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdTryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
