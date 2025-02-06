import { Injectable, signal } from '@angular/core';
import { ITodo, Todo } from './todo.model';
import { createEffect } from 'src/create-effect';
import { tap } from 'rxjs';
import { Graph } from '../../utils/graph';

@Injectable()
export class TodoStore {
  private readonly state = {
    $todos: signal<ITodo[]>([]),
    $todoGraph: signal<Graph<string>>(new Graph<string>()),
  };

  public readonly $todos = this.state.$todos.asReadonly();
  public readonly $todoGraph = this.state.$todoGraph.asReadonly();

  /**
   * Add Todo
   * @param {ITodo} todo
   */
  public addTodo(todo: ITodo): void {
    this.state.$todos.update((todos) => [...todos, todo]);
    this.state.$todoGraph.update((graph) => {
      graph.addVertex(todo.id);
      return graph;
    });
  }

  /**
   * Delete Todo
   * @param {string} id
   */
  public deleteTodo(id: string): void {
    this.state.$todos.update((todos) => todos.filter((todo) => todo.id !== id));
    this.state.$todoGraph.update((graph) => {
      graph.removeVertex(id);
      return graph;
    });
  }

  private loadTodos = createEffect((_) => _.pipe(tap(() => {})));
}
