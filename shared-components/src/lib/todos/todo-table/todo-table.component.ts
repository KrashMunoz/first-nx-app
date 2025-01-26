import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../model/todo.model';

@Component({
  selector: 'lib-todo-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss',
})
export class TodoTableComponent {
  todoList = input<ITodo[]>([]);
}
