import { Component, inject, model, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GridLayoutComponent,
  ITodo,
  todoCategoryList,
  TodoListComponent,
  TodoStore,
} from '@myngapp/shared-components';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestStoreService } from '../services/test-store/test-store.service';
import { ShowcaseStore } from './showcase.store';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    GridLayoutComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TodoListComponent,
  ],
  providers: [ShowcaseStore],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  public store = inject(ShowcaseStore);
  public todoStore = inject(TodoStore);
  public todos: Signal<ITodo[]> = this.todoStore.$todos;
  readonly animal = signal('animal value');
  readonly name = model('name value');
  readonly dialog = inject(MatDialog);
  public testing = 'test';

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    const node = 'test';
    const testFn = (hello: string): string => `message: ${hello}`;
  }

  templateAreas: string = `
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar table table table table"
    "left-sidebar left-sidebar table table table table"
    `;
}

export interface DialogData {
  animal: string;
  name: string;
}
// MOVE TO COMPONENT LIBRARY
@Component({
  selector: 'add-todo-dialog',
  template: `
    <h2 mat-dialog-title>Adding Todo: {{ data.name }}</h2>
    <mat-dialog-content>
      <p>What's your favorite animal?</p>
      <!-- <mat-form-field>
        <mat-label>Favorite Animal</mat-label>
        <input matInput [(ngModel)]="animal" />
      </mat-form-field> -->
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="title" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="description" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category</mat-label>
        <input matInput [(ngModel)]="category" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Due Date</mat-label>
        <input matInput [(ngModel)]="dueDate" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Weight</mat-label>
        <input matInput [(ngModel)]="weight" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>timeEstimate</mat-label>
        <input matInput [(ngModel)]="timeEstimate" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="animal()" cdkFocusInitial>
        Ok
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  // TODO Model

  readonly title = model('');
  readonly description = model('');
  readonly category = model(undefined);
  readonly dueDate = model(new Date().toLocaleString('en-US'));
  readonly weight = model(undefined);
  readonly timeEstimate = model(undefined);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
