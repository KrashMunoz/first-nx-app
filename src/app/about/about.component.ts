import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from '@myngapp/shared-components';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, GridLayoutComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  templateAreas: string = `
  "side top-main top-main top-main top-main top-main"
  "side top-main top-main top-main top-main top-main"
  "side bottom-main bottom-main bottom-main bottom-main bottom-main"
  "side bottom-main bottom-main bottom-main bottom-main bottom-main"
  `;
}
