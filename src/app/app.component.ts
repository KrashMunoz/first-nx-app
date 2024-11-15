import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SharedComponentsComponent, TestComponentComponent, ThirdTryComponent } from '@myngapp/shared-components';
import { Store, StoreModule } from '@ngrx/store';
import { usersFeature } from './user.reducer';

@Component({
  standalone: true,
  imports: [RouterModule, TestComponentComponent, SharedComponentsComponent, ThirdTryComponent, StoreModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'myngapp';

  constructor(private store: Store) {
    this.store.select(usersFeature.selectUsersState).subscribe({
      next: (users) => {
        console.log('Getting User State...');
        console.log({users});
      },
      error: (err) => console.error(err)
    })
  }
}
