import { Component, inject, model, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Graph,
  GridLayoutComponent,
  ITodo,
  TodoListComponent,
  TodoStore,
} from '@myngapp/shared-components';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShowcaseStore } from './showcase.store';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TodoTableComponent } from '../../../shared-components/src/lib/todos/todo-table/todo-table.component';
import { TodoMapComponent } from '../../../shared-components/src/lib/todos/todo-map/todo-map.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
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
    MatSnackBarModule,
  ],
  providers: [ShowcaseStore],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  readonly store = inject(ShowcaseStore);
  readonly todoStore = inject(TodoStore);
  readonly todos: Signal<ITodo[]> = this.todoStore.$todos;
  readonly todoGraph: Signal<Graph<string>> = this.todoStore.$todoGraph;
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent);

    dialogRef.afterClosed().subscribe((todo) => {
      if (!todo) {
        const message = 'No todo created';
        console.warn(message);
        this._snackBar.open(message, 'Close', {
          duration: 2000,
        });
        return;
      }
      this.todoStore.addTodo(todo);
    });
  }

  templateAreas: string = `
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar table table table table"
    "left-sidebar left-sidebar table table table table"
    `;
}
