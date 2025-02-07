/**
 * ChatGPT Graph Class
 */
export class Graph<T> {
  private adjacencyList: Map<T, T[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Add a vertex
   * @param {T} vertex
   */
  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  /**
   * Add an edge
   * @param {T} vertex1
   * @param {T} vertex2
   * @param {boolean} directed
   */
  addEdge(vertex1: T, vertex2: T, directed: boolean = false): void {
    if (!this.adjacencyList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList.has(vertex2)) {
      this.addVertex(vertex2);
    }

    this.adjacencyList.get(vertex1)?.push(vertex2);

    if (!directed) {
      this.adjacencyList.get(vertex2)?.push(vertex1);
    }
  }

  /**
   * Remove a vertex and all associated edges
   * @param {T} vertex
   */
  removeVertex(vertex: T): void {
    if (this.adjacencyList.has(vertex)) {
      // Remove edges pointing to this vertex
      for (const [key, neighbors] of this.adjacencyList.entries()) {
        this.adjacencyList.set(
          key,
          neighbors.filter((neighbor) => neighbor !== vertex)
        );
      }

      // Remove the vertex itself
      this.adjacencyList.delete(vertex);
    }
  }

  /**
   * Remove an edge
   * @param {T} vertex1
   * @param {T} vertex2
   * @param {boolean} directed
   */
  removeEdge(vertex1: T, vertex2: T, directed: boolean = false): void {
    if (this.adjacencyList.has(vertex1)) {
      this.adjacencyList.set(
        vertex1,
        this.adjacencyList
          .get(vertex1)!
          .filter((neighbor) => neighbor !== vertex2)
      );
    }

    if (!directed && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(
        vertex2,
        this.adjacencyList
          .get(vertex2)!
          .filter((neighbor) => neighbor !== vertex1)
      );
    }
  }

  /**
   * Get children/neighbors of a vertex
   * @param {T} vertex
   * @returns {T[]}
   */
  getChildren(vertex: T): T[] {
    return this.adjacencyList.get(vertex) || [];
  }

  /**
   * Get All Vertices
   * @returns {T[]}
   */
  getAllVertices(): T[] {
    return Array.from(this.adjacencyList.keys()) || [];
  }

  /**
   * Depth-First Search (DFS)
   * @param {T} start
   * @returns {T[]}
   */
  depthFirstSearch(start: T): T[] {
    const visited = new Set<T>();
    const result: T[] = [];

    const dfs = (vertex: T) => {
      if (!vertex || visited.has(vertex)) return;
      visited.add(vertex);
      result.push(vertex);
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        dfs(neighbor);
      }
    };

    dfs(start);
    return result;
  }

  /**
   * Breadth-First Search (BFS)
   * @param {T} start
   * @returns {T[]}
   */
  breadthFirstSearch(start: T): T[] {
    const visited = new Set<T>();
    const queue: T[] = [start];
    const result: T[] = [];

    while (queue.length > 0) {
      const vertex = queue.shift();
      if (vertex && !visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        const neighbors = this.adjacencyList.get(vertex) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }

    return result;
  }

  /**
   * Display the graph
   * @returns {string}
   */
  displayGraph(): string {
    let graph = '';
    for (let [vertex, neighbors] of this.adjacencyList) {
      let str = `${vertex} -> ${neighbors.join(', ')}`;
      graph += str;
    }
    return graph;
  }

  /**
   * Returns an array with all edges in the graph
   * @returns
   */
  getAllEdges(): IEdgeDef<T>[] {
    let edges = [];
    this.adjacencyList.entries();
    for (let [vertex, neighbors] of this.adjacencyList) {
      for (let destination of neighbors) {
        edges.push({
          from: vertex,
          end: destination,
        });
      }
    }
    return edges;
  }
}

export interface IEdgeDef<T> {
  from: T;
  end: T;
}

/**
 * ChatGPT Tester Function
 */
export const graphTest1 = () => {
  // Example usage
  const graph = new Graph<string>();

  // Add vertices
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');

  // Add edges
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'C');
  graph.addEdge('B', 'D');
  graph.addEdge('C', 'D');

  // Log Edges
  console.log('All Graph Edges:', graph.getAllEdges());

  // Perform searches
  console.log('DFS starting from A:', graph.depthFirstSearch('A')); // Output: ["A", "B", "D", "C"]
  console.log('BFS starting from A:', graph.breadthFirstSearch('A')); // Output: ["A", "B", "C", "D"]

  // Remove an edge
  graph.removeEdge('A', 'C');
  console.log('After removing edge A-C:', graph.getChildren('A')); // Output: ["B"]

  // Remove a vertex
  graph.removeVertex('B');
  console.log('After removing vertex B:', graph.getChildren('A')); // Output: []
  console.log('DFS starting from A:', graph.depthFirstSearch('A')); // Output: ["A", "C", "D"]
};
