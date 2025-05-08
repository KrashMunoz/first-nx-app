import { Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ITodo } from '@myngapp/shared-components';

@Component({
    selector: 'app-add-edge',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatSelectModule,
        MatDatepickerModule,
    ],
    templateUrl: './add-edge.component.html',
    styleUrl: './add-edge.component.scss'
})
export class AddEdgeComponent {
  readonly dialogRef = inject(MatDialogRef<AddEdgeComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly options: ITodo[] = this.data.vertexList;

  source = model('');
  target = model('');

  /**
   * Pass edge data to the parent component
   */
  onAddEdge(): void {
    this.dialogRef.close({
      source: this.source(),
      target: this.target(),
    });
  }

  /**
   * Close dialog ref
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  vertexList: ITodo[];
}
