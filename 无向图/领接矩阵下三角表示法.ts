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
 * 无向图，领接矩阵下三角数组表示法
 * triangular matrix 下三角矩阵
 */
class Graph {
  arr: number[] = [];
  adjacencyMatrix: number[][] = [];
  constructor(adjacencyMatrix: number[][]) {
    // 领接矩阵下三角表示法
    this.adjacencyMatrix = adjacencyMatrix;
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      for (let j = 0; j < i + 1; j++) {
        this.arr.push(adjacencyMatrix[i][j]);
      }
    }
  }
  getVertexNum() {
    let vertexNum = 0;
    while (((1 + vertexNum) * vertexNum) / 2 + 1 < this.arr.length) {
      vertexNum += 1;
    }
    return vertexNum;
  }
  // 判断两个点Vertex是否存在边Edge
  getEdge(v: number, w: number) {
    // 下三角，w一定要小于v
    if (w > v) {
      const a = v;
      v = w;
      w = a;
    }
    return this.arr[((v + 1) * v) / 2 + w];
  }
  // 获取邻接点
  getAdjacentVertex(v: number) {
    const adjacentVertexes: number[] = [];
    // 行
    for (let i = ((v + 1) * v) / 2; i < ((v + 1) * v) / 2 + v + 1; i++) {
      const edge = this.arr[i];
      if (edge) adjacentVertexes.push(i - ((v + 1) * v) / 2);
    }
    const vertexNum = this.getVertexNum();
    // 列
    for (let i = v + 1; i < vertexNum; i++) {
      const edge = this.arr[((i + 1) * i) / 2 + v];
      if (edge) adjacentVertexes.push(i);
    }
    return adjacentVertexes;
  }
}

const g = new Graph(adjacencyMatrix);
console.log(g.arr);
console.log(g.getEdge(2, 1));
console.log(adjacencyMatrix[2][1]);
console.log(g.getEdge(1, 2));
console.log(adjacencyMatrix[1][2]);
console.log(g.getVertexNum());
console.log(g.getAdjacentVertex(3));
