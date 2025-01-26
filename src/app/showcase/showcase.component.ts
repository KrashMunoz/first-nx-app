import {
  Component,
  inject,
  model,
  ModelSignal,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GridLayoutComponent,
  ITodo,
  Todo,
  TodoCategory,
  todoCategoryList,
  TodoListComponent,
  TodoStore,
  TodoTime,
  todoTimeList,
  TodoWeight,
  todoWeightList,
} from '@myngapp/shared-components';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestStoreService } from '../services/test-store/test-store.service';
import { ShowcaseStore } from './showcase.store';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { TodoTableComponent } from '../../../shared-components/src/lib/todos/todo-table/todo-table.component';
import { TodoMapComponent } from '../../../shared-components/src/lib/todos/todo-map/todo-map.component';
@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    GridLayoutComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TodoListComponent,
    TodoTableComponent,
    TodoMapComponent,
  ],
  providers: [ShowcaseStore],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  public store = inject(ShowcaseStore);
  public todoStore = inject(TodoStore);
  public todos: Signal<ITodo[]> = this.todoStore.$todos;
  readonly animal = signal('animal value');
  readonly name = model('name value');
  readonly dialog = inject(MatDialog);
  public testing = 'test';

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((todo) => {
      // console.log(`Dialog result: ${result}`);
      console.log('Created Todo =>', todo);
      this.todoStore.addTodo(todo);
    });
    const node = 'test';
    const testFn = (hello: string): string => `message: ${hello}`;
  }

  templateAreas: string = `
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar table table table table"
    "left-sidebar left-sidebar table table table table"
    `;
}

export interface DialogData {
  animal: string;
  name: string;
}
// MOVE TO COMPONENT LIBRARY
@Component({
  selector: 'add-todo-dialog',
  template: `
    <h2 mat-dialog-title>Adding Todo: {{ data.name }}</h2>
    <mat-dialog-content>
      <p>What's your favorite animal?</p>
      <!-- <mat-form-field>
        <mat-label>Favorite Animal</mat-label>
        <input matInput [(ngModel)]="animal" />
      </mat-form-field> -->
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="title" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="description" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category</mat-label>
        <mat-select [(ngModel)]="category">
          @for (category of categoryOptions; track category) {
          <mat-option [value]="category">{{ category }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Due Date</mat-label>
        <input matInput [matDatepicker]="picker" [(ngModel)]="dueDate" />
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Weight</mat-label>
        <mat-select [(ngModel)]="weight">
          @for (weight of weightOptions; track weight) {
          <mat-option [value]="weight">{{ weight }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Time Estimate</mat-label>
        <mat-select [(ngModel)]="timeEstimate">
          @for (time of timeEstimateOptions; track time) {
          <mat-option [value]="time.key">{{ time.label }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <!-- <button mat-button [mat-dialog-close]="animal()" cdkFocusInitial>
        Ok
      </button> -->
      <button mat-button (click)="onAddTodo()" cdkFocusInitial>Ok</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  // TODO Model

  readonly title = model('');
  readonly description = model('');
  readonly category = model('Personal');
  readonly categoryOptions = todoCategoryList;
  readonly dueDate = model(new Date());
  readonly weight = model(1);
  readonly weightOptions = todoWeightList;
  readonly timeEstimate = model(0.5);
  readonly timeEstimateOptions = todoTimeList.map((time) => ({
    key: time,
    label: this.castTimeLabel(time),
  }));

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddTodo(): void {
    const todo = new Todo();
    if (this.title()) todo.setTitle(this.title());
    if (this.description()) todo.setDescription(this.description());
    if (!!this.category()) todo.setCategory(this.category() as TodoCategory);
    if (this.dueDate()) todo.setDueDate(this.dueDate());
    if (this.weight()) todo.setDifficulty(this.weight() as TodoWeight);
    if (this.timeEstimate())
      todo.setTimeEstimate(this.timeEstimate() as TodoTime);
    this.dialogRef.close(todo.getter());
  }

  /**
   * Cast a label for a todo time option
   * @param {TodoTime} timeOption - A time option provided form the type definition
   * @returns {string} label
   */
  private castTimeLabel(timeOption: TodoTime): string {
    let label: string;
    switch (timeOption) {
      case 0.5:
        label = '30 mins';
        break;
      case 1:
        label = '1 hr';
        break;
      case 3:
        label = '3 hrs';
        break;
      case 8:
        label = '1 day';
        break;
      default:
        console.error('castTimeLabel Error: Invalid TodoTime option');
        label = '';
        break;
    }
    return label;
  }
}
