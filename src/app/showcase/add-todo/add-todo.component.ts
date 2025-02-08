import { Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  Todo,
  TodoCategory,
  todoCategoryList,
  TodoTime,
  todoTimeList,
  TodoWeight,
  todoWeightList,
} from '@myngapp/shared-components';
import {
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  readonly dialogRef = inject(MatDialogRef<AddTodoComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  // TODO Model
  readonly title = model('');
  readonly description = model('');
  readonly category = model<TodoCategory>('Personal');
  readonly categoryOptions = todoCategoryList;
  readonly dueDate = model(new Date());
  readonly weight = model<TodoWeight>(1);
  readonly weightOptions = todoWeightList;
  readonly timeEstimate = model<TodoTime>(0.5);
  readonly timeEstimateOptions = todoTimeList.map((time) => ({
    key: time,
    label: this.castTimeLabel(time),
  }));

  /**
   * No click event handler
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Create a new todo instance using the todo model and todo builder
   * @todo move the todo model to a reactive form with validation
   */
  onAddTodo(): void {
    const todo = new Todo();
    todo
      .setTitle(this.title() || todo.getter().id)
      .setDescription(this.description() || 'N/A')
      .setCategory(this.category())
      .setDueDate(this.dueDate())
      .setDifficulty(this.weight())
      .setTimeEstimate(this.timeEstimate());
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

export interface DialogData {
  animal: string;
  name: string;
}
