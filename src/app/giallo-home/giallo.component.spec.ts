import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GialloComponent } from './giallo.component';

describe('GialloComponent', () => {
  let component: GialloComponent;
  let fixture: ComponentFixture<GialloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GialloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GialloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
