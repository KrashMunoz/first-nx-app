import { Injectable, signal } from '@angular/core';
import { ITodo, Todo } from './todo.model';
import { createEffect } from 'src/create-effect';
import { tap } from 'rxjs';
import { Graph } from '../../utils/graph';

@Injectable()
export class TodoStore {
  private readonly state = {
    $todos: signal<ITodo[]>([]),
    $todoGraph: signal<Graph<string> | undefined>(undefined),
  };

  public readonly $todos = this.state.$todos.asReadonly();

  public addTodo(todo: ITodo) {
    this.state.$todos.update((todos) => [...todos, todo]);
  }

  private loadTodos = createEffect((_) => _.pipe(tap(() => {})));
}
