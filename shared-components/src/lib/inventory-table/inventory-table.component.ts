import { Component, computed, input, InputSignal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InventoryItem, sortRowsByName, Vehicle } from '../vehicle-table/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss',
})
export class InventoryTableComponent {
  isReadonly: InputSignal<boolean> = input<boolean>(false);
  tableData: InputSignal<InventoryItem[]> = input<InventoryItem[]>([]);
  sortedTableData = computed(() =>
    sortRowsByName(this.tableData(), this.maxQty())
  );
  maxQty = input<Record<string, number>>({});
  // exceedsMax = computed(() => {
  //    &&
  // })
  displayedColumns = input<string[]>([]);
  afterValues = input<Record<string, number>>({});
  formModel: Record<string, number> = {};
  modelChanged = output<InventoryChangeEvent>();
  handleModelChange(name: string, quantity: number) {
    console.log('handleModelChange =>', { name, quantity });
    this.modelChanged.emit({ name, quantity });
  }
}

export type InventoryChangeEvent = {
  name: string;
  quantity: number;
};
