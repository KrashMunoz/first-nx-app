import { Component, computed, effect, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Graph, graphTest1 } from '@myngapp/shared-components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-giallo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './giallo.component.html',
  styleUrl: './giallo.component.scss',
})

export class GialloComponent {
  graph: Graph<string>;
  metadata: Map<string, IMetadata>;
  metadata$ = signal<any | undefined>(undefined);
  displayGraph$ = signal<string | undefined>(undefined);

  // Graph Form
  vertexID: string = '';
  vertexLabel: string = '';
  vertexWeight: number = 0;

  edgeFrom: string = ''
  edgeTo: string = '';

  allVertices = signal<string[] | undefined>([]);
  fromVertices: string[] = [];
  toVertices: string[] = [];

  constructor() {
    this.graph = new Graph<string>();
    this.metadata = new Map<string, IMetadata>();
    // graphTest1();
  }

  public addVertex() {
    this.graph.addVertex(this.vertexID);
    this.updateMetadata();
    this.updateDropdowns();
    this.displayGraph$.set(this.graph.displayGraph());
  }

  private updateMetadata(): void {
    const data: IMetadata = {
      label: this.vertexLabel,
      weight: this.vertexWeight
    }
    this.metadata.set(this.vertexID, data);
    this.metadata$.set(Array.from(this.metadata.entries()));
  }

  private updateDropdowns(): void {
    const allIds = this.graph.getAllVertices() || [];
    this.fromVertices = allIds;
    this.toVertices = allIds;
    this.allVertices.set(allIds);
  }

  public addEdge() {
    this.graph.addEdge(this.edgeFrom, this.edgeTo, true);
    this.updateDropdowns();
    this.displayGraph$.set(this.graph.displayGraph());
  }

  public filterOptions(input: 'from' | 'to', value: string) {
    if (!value) {
      return;
    }

    if (input === 'from') {
      this.fromVertices = this.fromVertices.filter(option => option !== value);
    } else {
      this.toVertices = this.toVertices.filter(option => option !== value);
    }
  }
}


interface IMetadata {
  label: string;
  weight: number;
}