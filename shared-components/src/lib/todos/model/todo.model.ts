import { generateShortId } from '../todo-utils/util';
export type TodoCategory = 'Travel' | 'Chore' | 'Work' | 'Personal';
export const todoCategoryList: TodoCategory[] = [
  'Chore',
  'Personal',
  'Travel',
  'Work',
];
export type TodoWeight = 1 | 2 | 3 | 5;
export const todoWeightList: TodoWeight[] = [1, 2, 3, 5];
export type TodoTime = 0.5 | 1 | 3 | 8;
export const todoTimeList: TodoTime[] = [0.5, 1, 3, 8];
export interface ITodo {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  category: TodoCategory;
  difficultyWeight: TodoWeight;
  timeEstimate: TodoTime;
}

export class Todo {
  private id: string;
  private title: string | undefined;
  private description: string | undefined;
  private creationDate: Date;
  private dueDate: Date | undefined;
  private category: TodoCategory | undefined;
  private difficultyWeight: TodoWeight | undefined;
  private timeEstimate: TodoTime | undefined;
  constructor() {
    this.id = generateShortId();
    this.creationDate = new Date();
  }

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public setCategory(category: TodoCategory) {
    this.category = category;
    return this;
  }

  public setDueDate(dueDate: Date) {
    this.dueDate = dueDate;
    return this;
  }

  public setDifficulty(weight: TodoWeight) {
    this.difficultyWeight = weight;
    return this;
  }

  public setTimeEstimate(estimate: TodoTime) {
    this.timeEstimate = estimate;
    return this;
  }

  public getter(): ITodo {
    return {
      id: this.id,
      title: String(this.title),
      description: String(this.description),
      creationDate: this.creationDate,
      dueDate: this.dueDate || new Date(),
      category: this.category || 'Personal',
      difficultyWeight: this.difficultyWeight || 1,
      timeEstimate: this.timeEstimate || 0.5,
    };
  }
}

// export class TodoFactory {
//   createTodoBuilder(): Todo {
//     return new Todo();
//   }
// }
