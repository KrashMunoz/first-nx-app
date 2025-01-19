import { inject, Injectable, signal } from '@angular/core';
import { concatMap, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { createEffect } from 'src/create-effect';
import { Item } from 'src/types';

@Injectable()
export class TestStoreService {
  private readonly appStore = inject(AppStore);
  private readonly state = {
    $count: signal<number>(0),
    $user: signal<string>('default_user'),
    $items: signal<Item[]>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $count = this.state.$count.asReadonly();
  public readonly $user = this.state.$user.asReadonly();
  public readonly $items = this.state.$items.asReadonly();

  constructor() {
    this.loadData();
  }

  private loadData = createEffect((_) =>
    _.pipe(
      // concatMap(() => {
      //   insert service method here??
      // })
      tap(() => { })
    )
  );

  public readonly eventHandler = createEffect<any>((_) =>
    _.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((event) => {
        this.state.$user.set(event as string);
        console.log(event);
      })
    )
  );
}
