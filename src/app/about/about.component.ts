import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from '@myngapp/shared-components';
import { TestStoreService } from '../services/test-store/test-store.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, GridLayoutComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  store = inject(TestStoreService);
  templateAreas: string = `
  "side-top side-top side-top top-main top-main top-main"
  "side-top side-top side-top top-main top-main top-main"
  "side-bottom side-bottom bottom-main bottom-main bottom-right bottom-right"
  "side-bottom side-bottom bottom-main bottom-main bottom-right bottom-right"
  `;
}
