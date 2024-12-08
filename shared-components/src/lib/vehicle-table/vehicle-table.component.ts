import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { removeNullOrZeroRecursive, Vehicle } from './model';
import {
  InventoryChangeEvent,
  InventoryTableComponent,
} from '../inventory-table/inventory-table.component';
import { InventoryStore } from './inventory.store';

@Component({
  selector: 'lib-vehicle-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    InventoryTableComponent,
  ],
  templateUrl: './vehicle-table.component.html',
  styleUrl: './vehicle-table.component.scss',
})
export class VehicleTableComponent {
  readonly panelOpenState = signal(false);
  isReadonly: InputSignal<boolean> = input<boolean>(false);
  tableData: InputSignal<Vehicle[]> = input<Vehicle[]>([]);
  displayedColumns = input<string[]>([]);
  writeColumns = ['name', 'quantity', 'toMove', 'after'];
  inventoryMap: Record<string, any> = {};
  inventory = inject(InventoryStore);

  // TODO: Determine if this should be in store or component
  handleInventoryEvent(vehicleName: string, event: InventoryChangeEvent) {
    if (vehicleName in this.inventoryMap) {
      this.inventoryMap[vehicleName][event.name] = event.quantity;
    } else {
      this.inventoryMap[vehicleName] = { [event.name]: event.quantity };
    }
    const cleanInventoryMap = removeNullOrZeroRecursive(this.inventoryMap);
    this.inventory.vehicleEvent(cleanInventoryMap);
  }
}
