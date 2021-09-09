/**
 * 图的领接矩阵表示法
 */
const adjacencyMatrix = [
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
];

/**
 * 有向图，领接矩阵表示法
 */
class Graph {
  adjacencyMatrix: number[][] = [];
  constructor(adjacencyMatrix: number[][]) {
    // 领接矩阵下三角表示法
    this.adjacencyMatrix = adjacencyMatrix;
  }
  getVertexNum() {
    return this.adjacencyMatrix.length;
  }
  // 判断两个点Vertex是否存在边Edge
  getEdge(v: number, w: number) {
    return this.adjacencyMatrix[v][w] || this.adjacencyMatrix[w][v];
  }
  // 获取邻接点
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
}

const g = new Graph(adjacencyMatrix);
console.log(g.getEdge(2, 1));
console.log(adjacencyMatrix[2][1]);
console.log(g.getEdge(1, 2));
console.log(adjacencyMatrix[1][2]);
console.log(g.getVertexNum());
console.log(g.getAdjacentVertex(3));
