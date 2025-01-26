import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../model/todo.model';

@Component({
  selector: 'lib-todo-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-map.component.html',
  styleUrl: './todo-map.component.scss',
})
export class TodoMapComponent {
  todoList = input<ITodo[]>([]);
}
