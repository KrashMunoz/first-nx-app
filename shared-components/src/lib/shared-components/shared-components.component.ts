import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/user.model';
import { State, usersFeature } from '../../../../src/app/user.reducer';
@Component({
  selector: 'lib-shared-components',
  standalone: true,
  imports: [CommonModule, StoreModule, AsyncPipe],
  templateUrl: './shared-components.component.html',
  styleUrl: './shared-components.component.scss',
})
export class SharedComponentsComponent {
  user$: Observable<State>;

  constructor(private store: Store) {
    this.user$ = this.store.select(usersFeature.selectUsersState);
    this.user$.subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err)
    })
  }
}
