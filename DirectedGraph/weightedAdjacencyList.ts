/**
 * 图的邻接表表示法
 */
interface adList {
  vertex: number;
  weights: number;
  next?: adList;
}

const adjacencyList: adList[] = [
  { vertex: 0 },
  {
    vertex: 1,
    next: {
      vertex: 2,
      next: { vertex: 4 },
    },
  },
  {
    vertex: 2,
    next: {
      vertex: 0,
      next: { vertex: 5, next: { vertex: 4 } },
    },
  },
  {
    vertex: 3,
    next: {
      vertex: 1,
      next: { vertex: 6 },
    },
  },
  {
    vertex: 4,
    next: {
      vertex: 3,
      next: { vertex: 5, next: { vertex: 6, next: { vertex: 7 } } },
    },
  },
  {
    vertex: 5,
    next: {
      vertex: 0,
      next: {
        vertex: 7,
      },
    },
  },
  {
    vertex: 6,
  },
  {
    vertex: 7,
    next: {
      vertex: 6,
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
  // 判断两个点Vertex是否存在边Edge
  // ！！!在有向图下明显存在问题
  // getEdge(v: number, w: number) {
  //   for (let i = 0; i < this.adjacencyList.length; i++) {
  //     if (v === this.adjacencyList[i].vertex) {
  //       let next = this.adjacencyList[i].next;
  //       while (next) {
  //         if (next.vertex === w) return true;
  //         next = next.next;
  //       }
  //       return false;
  //     }
  //   }
  // }
  // 获取（出度）邻接点
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
  // ！！！有问题
  // DFS() {
  //   const res: number[] = [];
  //   const dfs = (vertex: number) => {
  //     res.push(vertex);
  //     const adjacentVertexes = this.getAdjacentVertex(vertex) as number[];
  //     for (let i = 0; i < adjacentVertexes.length; i++) {
  //       if (!res.includes(adjacentVertexes[i])) {
  //         dfs(adjacentVertexes[i]);
  //       }
  //     }
  //   };
  //   dfs(0);
  //   return res;
  // }
  // 类似树的层序遍历
  // ！！！有问题
  // BFS() {
  //   const res: number[] = [];
  //   const queue: number[] = [];
  //   res.push(0);
  //   queue.push(0);
  //   while (queue.length) {
  //     const vertex = queue.shift() as number;
  //     const adjacentVertexes = this.getAdjacentVertex(vertex) as number[];
  //     for (let i = 0; i < adjacentVertexes.length; i++) {
  //       if (!res.includes(adjacentVertexes[i])) {
  //         res.push(adjacentVertexes[i]);
  //         queue.push(adjacentVertexes[i]);
  //       }
  //     }
  //   }
  //   return res;
  // }
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
      const adjVertexes = this.getAdjacentVertex(vertex) as number[];
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

const g = new Graph(adjacencyList);
// console.log(g.getEdge(2, 1));
// console.log(g.getEdge(1, 2));
console.log(g.getVertexNum());
console.log(g.getAdjacentVertex(3));
console.log(g.Unweighted(3));
// console.log(g.DFS());
// console.log(g.BFS());
