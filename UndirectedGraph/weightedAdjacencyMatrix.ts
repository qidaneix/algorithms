/**
 * 图的领接矩阵表示法
 */
const adjacencyMatrix = [
  [0, 0, 40, 0, 0, 50, 0, 0],
  [0, 0, 2, 4, 1, 0, 0, 0],
  [40, 2, 0, 0, 3, 10, 0, 0],
  [0, 4, 0, 0, 2, 0, 5, 0],
  [0, 1, 3, 2, 0, 7, 8, 4],
  [50, 0, 10, 0, 7, 0, 0, 6],
  [0, 0, 0, 5, 8, 0, 0, 1],
  [0, 0, 0, 0, 4, 6, 0, 1],
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
  // 最小生成树
  Prim() {
    // 以0节点为起点，初始化工作
    const MST = [-1]; // 树，并查集表示法
    const dist = []; // 收录+距离数组。重要！核心！
    const vtxNum = this.getVertexNum();
    const adjVertexes = this.getAdjacentVertex(0);
    for (let i = 0; i < vtxNum; i++) {
      if (i === 0) {
        dist[i] = 0;
      } else if (adjVertexes.includes(i)) {
        dist[i] = this.adjacencyMatrix[0][i];
        MST[i] = 0;
      } else {
        dist[i] = Infinity;
      }
    }
    function findMinVertex(dist: number[]) {
      let min = Infinity;
      let vertex = -1;
      for (let i = 0; i < dist.length; i++) {
        // 未被收录的顶点最小者
        if (dist[i] && dist[i] < min) {
          min = dist[i];
          vertex = i;
        }
      }
      return vertex;
    }
    // 算法
    while (1) {
      const minVertex = findMinVertex(dist);
      if (minVertex === -1) break;
      dist[minVertex] = 0; // 收录
      const adjVertexes = this.getAdjacentVertex(minVertex);
      for (let i = 0; i < adjVertexes.length; i++) {
        if (
          dist[adjVertexes[i]] &&
          dist[adjVertexes[i]] > this.adjacencyMatrix[minVertex][adjVertexes[i]]
        ) {
          dist[adjVertexes[i]] =
            this.adjacencyMatrix[minVertex][adjVertexes[i]];
          MST[adjVertexes[i]] = minVertex;
        }
      }
    }
    if (dist.find((i) => i)) {
      throw new Error("图不连通");
    }
    return MST;
  }
}

const g = new Graph(adjacencyMatrix);
// console.log(g.arr);
// console.log(g.getEdge(2, 1));
// // console.log(adjacencyMatrix[2][1]);
// console.log(g.getEdge(1, 2));
// // console.log(adjacencyMatrix[1][2]);
// console.log(g.getVertexNum());
// console.log(g.getAdjacentVertex(3));
// console.log(g.DFS());
// console.log(g.BFS());
console.log(g.Prim());
