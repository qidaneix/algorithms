/**
 * 图的邻接表表示法
 */
interface adList {
  vertex: number;
  weights: number;
  next?: adList;
}

const adjacencyList: adList[] = [
  { vertex: 0, weights: 0 },
  {
    vertex: 1,
    weights: 0,
    next: {
      vertex: 2,
      weights: 2,
      next: { vertex: 4, weights: 1 },
    },
  },
  {
    vertex: 2,
    weights: 0,
    next: {
      vertex: 0,
      weights: 1,
      next: { vertex: 5, weights: 10, next: { vertex: 4, weights: 3 } },
    },
  },
  {
    vertex: 3,
    weights: 0,
    next: {
      vertex: 1,
      weights: 4,
      next: { vertex: 6, weights: 5 },
    },
  },
  {
    vertex: 4,
    weights: 0,
    next: {
      vertex: 3,
      weights: 2,
      next: {
        vertex: 5,
        weights: 2,
        next: { vertex: 6, weights: 8, next: { vertex: 7, weights: 4 } },
      },
    },
  },
  {
    vertex: 5,
    weights: 0,
    next: {
      vertex: 0,
      weights: 2,
      next: {
        vertex: 7,
        weights: 6,
      },
    },
  },
  {
    vertex: 6,
    weights: 0,
  },
  {
    vertex: 7,
    weights: 0,
    next: {
      vertex: 6,
      weights: 1,
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
  // 获取带权重的（出度）邻接点
  getAdjacentVertexWithWeight(v: number) {
    for (let i = 0; i < this.adjacencyList.length; i++) {
      if (v === this.adjacencyList[i].vertex) {
        const adjacentVertexes: { vertex: number; weights: number }[] = [];
        let next = this.adjacencyList[i].next;
        while (next) {
          adjacentVertexes.push({ vertex: next.vertex, weights: next.weights });
          next = next.next;
        }
        return adjacentVertexes;
      }
    }
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
  // 有权最短路径
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
}

const g = new Graph(adjacencyList);
// console.log(g.getEdge(2, 1));
// console.log(g.getEdge(1, 2));
console.log(g.getVertexNum());
console.log(g.getAdjacentVertex(3));
console.log(g.Unweighted(3));
// console.log(g.DFS());
// console.log(g.BFS());
