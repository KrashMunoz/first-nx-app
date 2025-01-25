import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-todo-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss',
})
export class TodoTableComponent {}
