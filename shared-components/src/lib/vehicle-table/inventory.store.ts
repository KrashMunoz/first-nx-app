import { computed, inject, Injectable, signal } from '@angular/core';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  finalize,
  tap,
  timer,
} from 'rxjs';
import { createEffect } from 'src/create-effect';
import {
  groupInventories,
  mockVehicleData,
  removeNullOrZeroProperties,
  removeNullOrZeroRecursive,
  Vehicle,
} from './model';
import { InventoryChangeEvent } from '../inventory-table/inventory-table.component';

@Injectable()
export class InventoryStore {
  private readonly state = {
    $vehicles: signal<Vehicle[]>([]),
    $loading: signal<boolean>(false),
    $targetVehicle: signal<Vehicle | undefined>(undefined),
    $targetVehicleComputedCols: signal<(Vehicle & writableColumns) | undefined>(
      undefined
    ),
    $targetInventory: signal<Record<string, number>>({
      Tires: 10,
      'Engine Oil': 10,
    }),
    $fromInventories: signal<Record<string, InventoryPayloadMap>>({}),
    $inventoryPayload: signal<InventoryPayload | undefined>(undefined),
    $afterForTarget: signal<Record<string, number>>({}),
  } as const;

  public readonly $vehicles = this.state.$vehicles.asReadonly();
  public readonly $targetVehicle = this.state.$targetVehicle.asReadonly();
  public readonly $loading = this.state.$loading.asReadonly();
  // REFACTOR THIS
  public readonly $targetVehicleComputed = computed(() => ({
    ...this.state.$targetVehicle(),
    inventory: this.state.$targetVehicle()?.inventory.map((inv) => ({
      ...inv,
      target:
        inv.name in this.state.$targetInventory()
          ? this.state.$targetInventory()[inv.name]
          : 0,
      toMove: 0,
      after: inv.quantity,
    })),
  }));
  public readonly $afterForTarget = this.state.$afterForTarget.asReadonly();
  public readonly $inventoryPayload = this.state.$inventoryPayload.asReadonly();

  constructor() {
    this.loadVehicleData();
  }

  private loadVehicleData = createEffect((_) =>
    _.pipe(
      concatMap(() => {
        this.state.$loading.set(true);
        return timer(2000).pipe(
          finalize(() => {
            this.state.$loading.set(false);
          }),
          tap(() => {
            this.state.$vehicles.set(mockVehicleData);
            this.state.$targetVehicle.set(mockVehicleData[0]);
          })
        );
      })
    )
  );

  public readonly eventHandler = createEffect<any>((_) =>
    _.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((event) => {
        // this.state.$user.set(event as string);
        console.log(event);
      })
    )
  );

  // Update Quantity Count
  public readonly updateAfter = createEffect<InventoryChangeEvent>((_) =>
    _.pipe(
      tap((event) => {
        this.state.$afterForTarget.update((obj) => ({
          ...obj,
          [event.name]: !!obj[event.name]
            ? obj[event.name] + event.quantity
            : event.quantity,
        }));
      })
    )
  );
  public readonly vehicleEvent = createEffect<Record<string, any>>((_) =>
    _.pipe(
      tap((event) => {
        // console.log('payload =>', event);
        this.state.$inventoryPayload.set({
          targetInventory: this.state.$targetInventory(),
          fromInventories: event,
        });
        let groupedQty = removeNullOrZeroProperties(
          Object.entries(event).reduce(groupInventories, {})
        );
        this.state.$targetVehicle()?.inventory.forEach((item) => {
          if (item.name in groupedQty) {
            groupedQty[item.name] += item.quantity;
          }
        });
        this.state.$afterForTarget.set(groupedQty);
      })
    )
  );
}

export type InventoryPayload = {
  // targetInventory: Vehicle;
  targetInventory: Record<string, any>;
  // fromInventories: InventoryPayloadMap[];
  fromInventories: Record<string, any>;
};

export type InventoryPayloadMap = {
  vehicle_name: string;
  inventory_map: Record<string, number>;
};

export type writableColumns = {
  target: number;
  after: number;
};
