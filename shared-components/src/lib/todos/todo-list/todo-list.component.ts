import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ITodo } from '../model/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'lib-todo-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todoList = input<ITodo[]>([]);
  onDeleteTodo = output<string>();

  /**
   * Emit Delete Todo Event to parent component
   * @param id
   */
  deleteTodo(id: string): void {
    this.onDeleteTodo.emit(id);
  }
}
