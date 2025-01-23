import { inject, Injectable, signal } from "@angular/core";
import { AppStore } from "../app.store";
import { Graph } from "@myngapp/shared-components";

Injectable()
export class ShowcaseStore {
    private readonly appStore = inject(AppStore);
    private readonly state = {
        $graph: signal<Graph<string>>(new Graph<string>()),
        $metadata: signal<Graph<string>>(new Graph<string>()),
        $vertices: signal<string[]>([]),
        $currentNeighbors: signal<string[]>([]),
    }
}