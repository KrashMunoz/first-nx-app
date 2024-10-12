import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SharedComponentsComponent, TestComponentComponent, ThirdTryComponent } from '@myngapp/shared-components';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, TestComponentComponent, SharedComponentsComponent, ThirdTryComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'myngapp';
}
