import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { usersFeature } from '../user.reducer';
import {
  SharedComponentsComponent,
  TestComponentComponent,
  ThirdTryComponent,
} from '@myngapp/shared-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TestComponentComponent,
    SharedComponentsComponent,
    ThirdTryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private store: Store) {
    this.store.select(usersFeature.selectUsersState).subscribe({
      next: (users) => {
        console.log('Getting User State...');
        console.log({ users });
      },
      error: (err) => console.error(err),
    });
  }
}
