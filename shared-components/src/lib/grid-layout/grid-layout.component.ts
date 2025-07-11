import { Component, computed, effect, HostBinding, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-grid-layout',
    imports: [CommonModule],
    templateUrl: './grid-layout.component.html',
    styleUrl: './grid-layout.component.scss'
})
export class GridLayoutComponent {
    // Input properties for grid configuration
    @Input() columns: string = 'repeat(auto-fill, minmax(200px, 1fr))';  // Default to auto-fill with minmax
    @Input() rows: string = 'auto'; // Default to auto rows
    @Input() gap: string = '16px'; // Default gap between items
    templateAreas = input<string>('');
  
    constructor() { }
  
    ngOnInit(): void {
      // Logic to handle other initializations if needed
    }
  
}
