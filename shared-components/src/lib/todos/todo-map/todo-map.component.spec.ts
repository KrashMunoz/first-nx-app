import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoMapComponent } from './todo-map.component';

describe('TodoMapComponent', () => {
  let component: TodoMapComponent;
  let fixture: ComponentFixture<TodoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
