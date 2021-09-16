/**
 * 图的领接矩阵表示法
 */
const adjacencyMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 3, 10, 0, 0],
  [0, 4, 0, 0, 0, 0, 6, 0],
  [0, 0, 0, 2, 0, 2, 8, 4],
  [2, 0, 0, 0, 0, 0, 0, 6],
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
  // 获取带权（出度）邻接点
  getAdjacentVertexWithWeight(v: number) {
    const adjacentVertexes: { vertex: number; weights: number }[] = [];
    // 行
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      const edge = this.adjacencyMatrix[v][i];
      if (edge) adjacentVertexes.push({ vertex: i, weights: edge });
    }
    return adjacentVertexes;
  }
  // 寻找最小值
  findMinIndex(array: number[], set: Set<number>) {
    let min = Infinity;
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (!set.has(i) && array[i] < min) {
        min = array[i];
        index = i;
      }
    }
    return index;
  }
  // 单源有权最短路径
  Dijkstra(s: number) {
    const set = new Set<number>();
    set.add(s);
    const dist = [];
    const path = [];
    const vertexNum = this.getVertexNum();
    for (let i = 0; i < vertexNum; i++) {
      dist.push(Infinity);
      path.push(-1);
    }
    dist[s] = 0;
    const sAdjVtx = this.getAdjacentVertexWithWeight(s);
    for (let i = 0; i < sAdjVtx.length; i++) {
      dist[sAdjVtx[i].vertex] = sAdjVtx[i].weights;
      path[sAdjVtx[i].vertex] = s;
    }
    while (1) {
      const index = this.findMinIndex(dist, set);
      if (index === -1) break;
      set.add(index);
      const sAdjVtx = this.getAdjacentVertexWithWeight(index);
      for (let i = 0; i < sAdjVtx.length; i++) {
        if (!set.has(sAdjVtx[i].vertex)) {
          dist[sAdjVtx[i].vertex] = dist[index] + sAdjVtx[i].weights;
          path[sAdjVtx[i].vertex] = index;
        }
      }
    }
    return {
      dist,
      path,
    };
  }
  // 多源有权最短路径
  Floyd() {
    const D: number[][] = [];
    const path: number[][] = [];
    const adjVtxNum = this.getVertexNum();
    // 初始化D矩阵
    for (let i = 0; i < adjVtxNum; i++) {
      D[i] = [];
      path[i] = [];
      for (let j = 0; j < adjVtxNum; j++) {
        if (!this.adjacencyMatrix[i][j] && i !== j) {
          D[i][j] = Infinity;
        } else {
          D[i][j] = this.adjacencyMatrix[i][j];
        }
        path[i][j] = -1;
      }
    }

    for (let k = 0; k < adjVtxNum; k++)
      for (let i = 0; i < adjVtxNum; i++)
        for (let j = 0; j < adjVtxNum; j++)
          if (D[i][j] > D[i][k] + D[k][j]) {
            D[i][j] = D[i][k] + D[k][j];
            path[i][j] = k;
          }

    return { D, path };
  }
  // 获取i -> j的最短路径
  getPath(i: number, j: number) {
    const { path } = this.Floyd();
    const p: number[] = [];
    const f = (m: number, n: number) => {
      if (path[m][n] === -1) {
        return;
      }
      const k = path[m][n];
      f(m, k);
      p.push(k);
      f(k, n);
    };
    f(i, j);
    p.unshift(i);
    p.push(j);
    return p;
  }
}

const g = new Graph(adjacencyMatrix);
// console.log(g.getEdge(2, 1));
// console.log(adjacencyMatrix[2][1]);
// console.log(g.getEdge(1, 2));
// console.log(adjacencyMatrix[1][2]);
// console.log(g.getVertexNum());
// console.log(g.getAdjacentVertex(3));
console.log(JSON.stringify(g.Floyd().path));
console.log(g.getPath(1, 6));
