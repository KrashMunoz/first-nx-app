import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-test-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
})
export class TestComponentComponent {}
