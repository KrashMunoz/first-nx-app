import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, usersFeature } from 'src/app/user.reducer';

@Component({
  selector: 'lib-third-try',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './third-try.component.html',
  styleUrl: './third-try.component.scss',
})
export class ThirdTryComponent {
  user$: Observable<State>;

  constructor(private store: Store) {
    this.user$ = this.store.select(usersFeature.selectUsersState);
    // this.user$.subscribe({
    //   next: (response) => console.log(response),
    //   error: (err) => console.error(err)
    // })
  }

}