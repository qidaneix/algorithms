/**
 * 图的领接矩阵表示法
 */
const adjacencyMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
];

/**
 * 有向图，领接矩阵表示法
 */
class Graph {
  adjacencyMatrix: number[][] = [];
  constructor(adjacencyMatrix: number[][]) {
    this.adjacencyMatrix = adjacencyMatrix;
  }
  getVertexNum() {
    return this.adjacencyMatrix.length;
  }
  // 判断两个点Vertex是否存在边Edge
  getEdge(v: number, w: number) {
    return this.adjacencyMatrix[v][w] || this.adjacencyMatrix[w][v];
  }
  // 获取（出度 + 入度）邻接点
  getAdjacentVertex(v: number) {
    const adjacentVertexes: number[] = [];
    // 行
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      const edge = this.adjacencyMatrix[v][i];
      if (edge) adjacentVertexes.push(i);
    }
    // 列
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      const edge = this.adjacencyMatrix[i][v];
      if (edge) adjacentVertexes.push(i);
    }
    return adjacentVertexes;
  }
  // 类似树的先序遍历
  DFS() {
    const res: number[] = [];
    const dfs = (vertex: number) => {
      res.push(vertex);
      const adjacentVertexes = this.getAdjacentVertex(vertex);
      for (let i = 0; i < adjacentVertexes.length; i++) {
        if (!res.includes(adjacentVertexes[i])) {
          dfs(adjacentVertexes[i]);
        }
      }
    };
    dfs(0);
    return res;
  }
  // 类似树的层序遍历
  BFS() {
    const res: number[] = [];
    const queue: number[] = []; // 队列
    queue.push(0);
    res.push(0);
    while (queue.length) {
      const v = queue.shift() as number;
      const adjacentVertexes = this.getAdjacentVertex(v);
      for (let i = 0; i < adjacentVertexes.length; i++) {
        if (!res.includes(adjacentVertexes[i])) {
          res.push(adjacentVertexes[i]);
          queue.push(adjacentVertexes[i]);
        }
      }
    }
    return res;
  }
  // 获取（出度）邻接点
  getAdjacentVertexOutDegree(v: number) {
    const adjacentVertexes: number[] = [];
    // 行
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      const edge = this.adjacencyMatrix[v][i];
      if (edge) adjacentVertexes.push(i);
    }
    return adjacentVertexes;
  }
  // 无权最短路径
  Unweighted(s: number) {
    const vertexNum = this.getVertexNum();
    const dist = [];
    const path = [];
    for (let i = 0; i < vertexNum; i++) {
      dist[i] = -1;
      path[i] = -1;
    }
    const queue = [];
    dist[s] = 0;
    queue.push(s);
    while (queue.length) {
      const vertex = queue.shift() as number;
      const adjVertexes = this.getAdjacentVertexOutDegree(vertex) as number[];
      for (let i = 0; i < adjVertexes.length; i++) {
        if (dist[adjVertexes[i]] === -1) {
          dist[adjVertexes[i]] = dist[vertex] + 1;
          path[adjVertexes[i]] = vertex;
          queue.push(adjVertexes[i]);
        }
      }
    }
    return {
      dist,
      path,
    };
  }
}

const g = new Graph(adjacencyMatrix);
console.log(g.getEdge(2, 1));
console.log(adjacencyMatrix[2][1]);
console.log(g.getEdge(1, 2));
console.log(adjacencyMatrix[1][2]);
console.log(g.getVertexNum());
console.log(g.getAdjacentVertex(3));
