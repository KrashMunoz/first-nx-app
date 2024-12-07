import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '@myngapp/shared-components';
import { Store } from '@ngrx/store';
import { usersFeature } from './user.reducer';
import { TestStoreService } from './services/test-store/test-store.service';

@Component({
  standalone: true,
  providers: [TestStoreService],
  imports: [RouterModule, NavBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'myngapp';

  constructor(private store: Store) {
    this.store.select(usersFeature.selectUsersState).subscribe({
      next: (users) => {
        // console.log('Getting User State...');
        // console.log({ users });
      },
      error: (err) => console.error(err),
    });
  }
}
