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
    const queue: number[] = [];
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
}

const g = new Graph(adjacencyMatrix);
// console.log(g.arr);
// console.log(g.getEdge(2, 1));
// console.log(adjacencyMatrix[2][1]);
// console.log(g.getEdge(1, 2));
// console.log(adjacencyMatrix[1][2]);
// console.log(g.getVertexNum());
// console.log(g.getAdjacentVertex(3));
// console.log(g.DFS());
console.log(g.BFS());
