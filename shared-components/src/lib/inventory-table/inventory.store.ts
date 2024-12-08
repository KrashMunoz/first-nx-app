import { inject, Injectable, signal } from '@angular/core';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  finalize,
  tap,
  timer,
} from 'rxjs';
import { createEffect } from 'src/create-effect';
import { Item } from 'src/types';
import { mockVehicleData, Vehicle } from './model';

@Injectable()
export class InventoryStore {
  private readonly state = {
    $vehicles: signal<Vehicle[]>([]),
    $loading: signal<boolean>(false),
    $targetVehicle: signal<Vehicle | undefined>(undefined),
  } as const;

  public readonly $vehicles = this.state.$vehicles.asReadonly();
  public readonly $targetVehicle = this.state.$targetVehicle.asReadonly();
  public readonly $loading = this.state.$loading.asReadonly();

  constructor() {
    this.loadVehicleData();
  }

  private loadVehicleData = createEffect((_) =>
    _.pipe(
      concatMap(() => {
        this.state.$loading.set(true);
        return timer(3000).pipe(
          finalize(() => {
            this.state.$loading.set(false);
          }),
          tap(() => {
            this.state.$vehicles.set(mockVehicleData);
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
}
