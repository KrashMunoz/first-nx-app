import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { usersFeature } from '../user.reducer';
import {
  GridLayoutComponent,
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
    GridLayoutComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private store: Store) {
    // TODO: Determine if I want to keep this subscription
    // this.store.select(usersFeature.selectUsersState).subscribe({
    //   next: (users) => {
    //     console.log('Getting User State...');
    //   },
    //   error: (err) => console.error(err),
    // });
  }
}
