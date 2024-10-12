import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-shared-components',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-components.component.html',
  styleUrl: './shared-components.component.scss',
})
export class SharedComponentsComponent {}
