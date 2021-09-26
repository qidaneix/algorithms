/**
 * 图的邻接表表示法
 */
interface adList {
  vertex: number;
  weights: number;
  next?: adList;
}

const adjacencyList: adList[] = [
  {
    vertex: 0,
    weights: 0,
    next: { vertex: 2, weights: 40, next: { vertex: 5, weights: 50 } },
  },
  {
    vertex: 1,
    weights: 0,
    next: {
      vertex: 2,
      weights: 2,
      next: { vertex: 3, weights: 0, next: { vertex: 4, weights: 2 } },
    },
  },
  {
    vertex: 2,
    weights: 0,
    next: {
      vertex: 1,
      weights: 2,
      next: {
        vertex: 5,
        weights: 10,
        next: { vertex: 4, weights: 3, next: { vertex: 0, weights: 40 } },
      },
    },
  },
  {
    vertex: 3,
    weights: 0,
    next: {
      vertex: 1,
      weights: 4,
      next: { vertex: 4, weights: 2, next: { vertex: 6, weights: 5 } },
    },
  },
  {
    vertex: 4,
    weights: 0,
    next: {
      vertex: 1,
      weights: 1,
      next: {
        vertex: 2,
        weights: 3,
        next: {
          vertex: 3,
          weights: 2,
          next: {
            vertex: 5,
            weights: 7,
            next: { vertex: 6, weights: 8, next: { vertex: 7, weights: 4 } },
          },
        },
      },
    },
  },
  {
    vertex: 5,
    weights: 0,
    next: {
      vertex: 0,
      weights: 50,
      next: {
        vertex: 2,
        weights: 10,
        next: {
          vertex: 4,
          weights: 7,
          next: { vertex: 7, weights: 6 },
        },
      },
    },
  },
  {
    vertex: 6,
    weights: 0,
    next: {
      vertex: 3,
      weights: 5,
      next: { vertex: 4, weights: 8, next: { vertex: 7, weights: 1 } },
    },
  },
  {
    vertex: 7,
    weights: 0,
    next: {
      vertex: 4,
      weights: 4,
      next: { vertex: 6, weights: 1, next: { vertex: 5, weights: 6 } },
    },
  },
];

/**
 * 无向图，领接表表示法
 */
class Graph {
  adjacencyList: adList[] = [];
  constructor(adjacencyList: adList[]) {
    this.adjacencyList = adjacencyList;
  }
  getVertexNum() {
    return this.adjacencyList.length;
  }
  // 判断两个点Vertex是否存在边Edge ?待验证
  getEdge(v: number, w: number) {
    for (let i = 0; i < this.adjacencyList.length; i++) {
      if (v === this.adjacencyList[i].vertex) {
        let next = this.adjacencyList[i].next;
        while (next) {
          if (next.vertex === w) return true;
          next = next.next;
        }
        return false;
      }
    }
  }
  // 获取邻接点
  getAdjacentVertex(v: number) {
    for (let i = 0; i < this.adjacencyList.length; i++) {
      if (v === this.adjacencyList[i].vertex) {
        const adjacentVertexes: number[] = [];
        let next = this.adjacencyList[i].next;
        while (next) {
          adjacentVertexes.push(next.vertex);
          next = next.next;
        }
        return adjacentVertexes;
      }
    }
  }
  // 类似树的先序遍历
  DFS() {
    const res: number[] = [];
    const dfs = (vertex: number) => {
      res.push(vertex);
      const adjacentVertexes = this.getAdjacentVertex(vertex) as number[];
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
    res.push(0);
    queue.push(0);
    while (queue.length) {
      const vertex = queue.shift() as number;
      const adjacentVertexes = this.getAdjacentVertex(vertex) as number[];
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
  Kruskal() {}
}

const g = new Graph(adjacencyList);
console.log(g.getEdge(2, 1));
console.log(g.getEdge(1, 2));
console.log(g.getVertexNum());
console.log(g.getAdjacentVertex(3));
console.log(g.DFS());
console.log(g.BFS());
