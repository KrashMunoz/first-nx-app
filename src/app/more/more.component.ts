import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from '@myngapp/shared-components';
import { TestStoreService } from '../services/test-store/test-store.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
    selector: 'app-more',
    imports: [
        CommonModule,
        GridLayoutComponent,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: './more.component.html',
    styleUrl: './more.component.scss'
})
export class MoreComponent {
  public store = inject(TestStoreService);

  templateAreas: string = `
  "top-main top-main top-main top-main top-main top-main"
  "top-main top-main top-main top-main top-main top-main"
  "bottom-main bottom-main bottom-main bottom-main bottom-main side"
  "bottom-main bottom-main bottom-main bottom-main bottom-main side"
  `;

  username: string = this.store.$user();
}
