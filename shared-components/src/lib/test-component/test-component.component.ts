import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { UserActions } from '../../../../src/app/user.actions' 
import { User } from 'src/app/user.model';
@Component({
  selector: 'lib-test-component',
  standalone: true,
  imports: [CommonModule, StoreModule, FormsModule],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
})
export class TestComponentComponent {
  userForm: string | undefined;
  constructor(private store: Store) { }

  submitUser() {
    const formModel = {
      user: this.userForm
    };
    // console.log({formModel});
    if (!!formModel.user) {
      const user: User = {id : formModel.user};
      this.store.dispatch(UserActions.addUser({user}));
    }
  }
}
