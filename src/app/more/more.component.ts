import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from '@myngapp/shared-components';

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [CommonModule, GridLayoutComponent],
  templateUrl: './more.component.html',
  styleUrl: './more.component.scss',
})
export class MoreComponent {
  templateAreas: string = `
  "top-main top-main top-main top-main top-main top-main"
  "top-main top-main top-main top-main top-main top-main"
  "bottom-main bottom-main bottom-main bottom-main bottom-main side"
  "bottom-main bottom-main bottom-main bottom-main bottom-main side"
  `;

  constructor() {}
}
