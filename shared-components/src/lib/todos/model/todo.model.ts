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
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public creationDate: Date,
    public dueDate: Date,
    public category: TodoCategory,
    public difficultyWeight: TodoWeight,
    public timeEstimate: TodoTime
  ) {
    this.id = generateShortId();
    this.creationDate = new Date();
  }

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setCategory(category: TodoCategory) {
    this.category = category;
  }

  public setDueDate(dueDate: Date) {
    this.dueDate = dueDate;
  }

  public setDifficulty(weight: TodoWeight) {
    this.difficultyWeight = weight;
  }

  public setTimeEstimate(estimate: TodoTime) {
    this.timeEstimate = estimate;
  }
}
