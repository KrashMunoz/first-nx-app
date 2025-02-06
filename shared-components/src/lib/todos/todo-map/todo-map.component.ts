import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../model/todo.model';
import { Graph } from '@myngapp/shared-components';

@Component({
  selector: 'lib-todo-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-map.component.html',
  styleUrl: './todo-map.component.scss',
})
export class TodoMapComponent {
  todoList = input<ITodo[]>([]);
  todoGraph = input<Graph<string>>();
}
