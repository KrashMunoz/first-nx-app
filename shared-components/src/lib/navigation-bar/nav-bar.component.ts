import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'lib-nav-bar',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  navOptions = [
    {
      label: 'home',
      value: '/home'
    },
    {
      label: 'about',
      value: '/about'
    },
    {
      label: 'more',
      value: '/more'
    },
    {
      label: 'showcase',
      value: '/showcase'
    },
  ]

  title = input.required();
  constructor() {

  }
}
