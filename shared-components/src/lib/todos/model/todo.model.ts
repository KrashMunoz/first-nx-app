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

/**
 * Todo using builder creational pattern
 * @class
 */
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

  /**
   * Set Title
   * @method
   * @param {string} title - Title for todo object
   * @returns {this}
   */
  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  /**
   * Set Description
   * @method
   * @param {string} description - Description of todo action
   * @returns {this}
   */
  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Set Category
   * @method
   * @param {string} category - Category for the todo
   * @returns {this}
   */
  public setCategory(category: TodoCategory): this {
    this.category = category;
    return this;
  }

  /**
   * Set Due Date
   * @method
   * @param {Date} dueDate - Due date for the todo
   * @returns {this}
   */
  public setDueDate(dueDate: Date): this {
    this.dueDate = dueDate;
    return this;
  }

  /**
   * Set Difficulty
   * @method
   * @param {TodoWeight} weight - Set the difficulty weight for the
   * @returns {this}
   */
  public setDifficulty(weight: TodoWeight): this {
    this.difficultyWeight = weight;
    return this;
  }

  /**
   * Set Estimate
   * @method
   * @param {TodoTime} estimate - Time estimate to complete the task
   * @returns {this}
   */
  public setTimeEstimate(estimate: TodoTime): this {
    this.timeEstimate = estimate;
    return this;
  }

  /**
   * Get the todo object
   * @method
   * @returns {ITodo}
   */
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
