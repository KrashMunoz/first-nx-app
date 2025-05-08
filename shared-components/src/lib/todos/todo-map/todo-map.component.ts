import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../model';
import { Graph } from '../../utils/graph';
import * as d3 from 'd3';

// interface Link {
//   source: string;
//   target: string;
// }

@Component({
    selector: 'lib-todo-map',
    imports: [CommonModule],
    templateUrl: './todo-map.component.html',
    styleUrl: './todo-map.component.scss'
})
export class TodoMapComponent implements AfterViewInit {
  readonly todoList = input<ITodo[]>([]);
  readonly todoGraph = input<Graph<string>>();
  readonly todoEdges = input<unknown[]>([]);
  readonly nodes = computed(() => {
    return this.todoList() || [];
  });
  readonly links = computed(() => {
    const edges = this.todoEdges();
    return edges.map((edge: any) => ({
      source: edge['from'],
      target: edge['end'],
    }));
  });

  height = 270;
  width = 800;
  simulation: any;
  svg: any;
  linkElements: any;
  nodeElements: any;

  constructor(private elementRef: ElementRef) {
    effect(() => {
      const change = this.todoList() || this.todoEdges();
      if (change) {
        this.updateGraph();
      }
    });
  }

  /**
   * Create Force Graph
   */
  private createForceGraph(): void {
    // const categories: string[] = Array.from(
    //   new Set(this.todoList().map((i) => i.category))
    // );
    const nodes: (d3.SimulationNodeDatum & ITodo)[] = this.nodes();
    // const color = d3.scaleOrdinal(categories, d3.schemeCategory10);

    this.simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(this.links()).id((d: any) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    this.svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('id', 'svg')
      .attr('border', '2px solid black')
      .attr('width', this.width)
      .attr('height', this.height);

    this.updateGraph();
  }

  ngAfterViewInit(): void {
    this.createForceGraph();
  }

  /**
   * Trigger graph updates
   */
  private updateGraph(): void {
    const svg = this.svg;
    if (!svg) {
      console.warn('svg is undefined');
      return;
    }
    const simulation = this.simulation;
    if (!simulation) {
      console.warn('simulation is undefined');
      return;
    }

    svg.selectAll('*').remove(); // Clear previous elements

    this.linkElements = this.svg
      .selectAll('.link')
      .data(this.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6);

    this.nodeElements = this.svg
      .selectAll('.node')
      .data(this.nodes())
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('fill', '#69b3a2');

    const label = this.svg
      .selectAll('text')
      .data(this.nodes())
      .enter()
      .append('text')
      .attr('dx', 12)
      .attr('dy', 4)
      .text((d: ITodo) => d.title);

    this.simulation.nodes(this.nodes()).on('tick', () => {
      this.linkElements
        .attr('x1', (d: any) => (d.source as any).x)
        .attr('y1', (d: any) => (d.source as any).y)
        .attr('x2', (d: any) => (d.target as any).x)
        .attr('y2', (d: any) => (d.target as any).y);

      this.nodeElements
        .attr('cx', (d: any) => (d as any).x)
        .attr('cy', (d: any) => (d as any).y);

      label
        .attr('x', (d: any) => (d as any).x)
        .attr('y', (d: any) => (d as any).y);
    });

    this.simulation.force('link')?.links(this.links());
    simulation.alpha(1).restart();
  }

  private linkArc(d: any) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
      `;
  }
}
