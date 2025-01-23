import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from '@myngapp/shared-components';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestStoreService } from '../services/test-store/test-store.service';
import { ShowcaseStore } from './showcase.store';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    GridLayoutComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    ShowcaseStore
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  public store = inject(ShowcaseStore);

  templateAreas: string = `
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar map map map map"
    "left-sidebar left-sidebar table table table table"
    "left-sidebar left-sidebar table table table table"
    `;
}
