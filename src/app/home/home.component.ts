import { Component, DestroyRef, HostBinding, OnDestroy } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        TestComponentComponent,
        SharedComponentsComponent,
        ThirdTryComponent,
        GridLayoutComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  templateAreas: string = default_template_areas;
  columns: string = default_columns;
  rows: string = default_rows;
  isSmall$: boolean = false;
  @HostBinding('class.flex') isFlex = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.Medium])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (state) => {
          // this.logCurrentRange();
          if (!!state.matches) {
            this.applyWebScreenGrid();
          } else {
            this.applyTabletScreenGrid();
          }
        },
      });
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (state) => {
          if (!!state.matches) {
            console.log('Phone...');
            this.setDisplayToFlex();
          } else {
            this.setDisplayToGrid();
          }
        },
      });
  }

  /**
   * Log Current Breakpoint (Checking for Webscreen)
   */
  logCurrentRange() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      console.log('Large Breakpoint');
    }
    if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      console.log('Medium Breakpoint');
    }
  }

  /**
   * Reset grid attributes to default
   */
  applyWebScreenGrid(): void {
    this.templateAreas = default_template_areas;
    this.rows = default_rows;
  }

  /**
   * Apply custom grid attributes for  tablet screens
   */
  applyTabletScreenGrid() {
    this.columns = 'minmax(100px, 1fr)';
    this.rows = 'max-content';
    this.templateAreas = `
    "side side side side side side"
    "top-main top-main top-main top-main top-main top-main"
    "bottom-main bottom-main bottom-main bottom-main bottom-main bottom-main"
    `;
  }

  /**
   * Update template variables using observer and host binding
   */
  setDisplayToFlex(): void {
    this.isSmall$ = true;
    this.isFlex = true;
  }

  /**
   * Set Display attribute to grid attribute using host binding and control flow syntax
   */
  setDisplayToGrid(): void {
    this.isSmall$ = false;
    this.isFlex = false;
  }
}
