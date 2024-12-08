import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Vehicle } from './model';

@Component({
  selector: 'lib-inventory-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss',
})
export class InventoryTableComponent {
  isReadonly: InputSignal<boolean> = input<boolean>(false);
  tableData: InputSignal<Vehicle[]> = input<Vehicle[]>([]);
  displayedColumns = input<string[]>([]);
}
