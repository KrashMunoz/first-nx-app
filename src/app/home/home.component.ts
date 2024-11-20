import { Component, HostBinding, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { usersFeature } from '../user.reducer';
import {
  GridLayoutComponent,
  SharedComponentsComponent,
  TestComponentComponent,
  ThirdTryComponent,
} from '@myngapp/shared-components';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  default_columns,
  default_rows,
  default_template_areas,
} from './grid.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TestComponentComponent,
    SharedComponentsComponent,
    ThirdTryComponent,
    GridLayoutComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy {
  templateAreas: string = default_template_areas;
  columns: string = default_columns;
  rows: string = default_rows;
  isSmall$: boolean = false;
  @HostBinding('class.flex') isFlex = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe(Breakpoints.Small).subscribe({
      next: () => {
        console.log('Small Breakpoint');
        this.templateAreas = default_template_areas;
        this.rows = default_rows;
        this.updateTemplateVars();
      },
    });
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe({
      next: () => {
        console.log('Extra Small Breakpoint');
        this.columns = 'minmax(100px, 1fr)';
        this.rows = 'max-content';
        this.templateAreas = `
        "side side side side side side"
        "top-main top-main top-main top-main top-main top-main"
        "bottom-main bottom-main bottom-main bottom-main bottom-main bottom-main"
        `;
        this.updateTemplateVars();
      },
    });
  }

  /**
   * Update template variables using observer and host binding
   */
  updateTemplateVars() {
    this.isSmall$ = this.breakpointObserver.isMatched(Breakpoints.XSmall);
    this.isFlex = this.isSmall$;
  }

  ngOnDestroy(): void {}
}
