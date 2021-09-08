/**
 * 图的领接矩阵表示法
 */
const leadMatrix = [
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

function leadMatrixToLowerTriangle(leadMatrix: number[][]): number[] {
  const arr: number[] = [];
  for (let i = 0; i < leadMatrix.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      arr.push(leadMatrix[i][j]);
    }
  }
  return arr;
}

/**
 *
 */
class Graph {
  arr: number[] = [];
  leadMatrix: number[][] = [];
  //
  constructor(leadMatrix: number[][]) {
    // 领接矩阵下三角表示法
    this.leadMatrix = this.leadMatrix;
    for (let i = 0; i < leadMatrix.length; i++) {
      for (let j = 0; j < i + 1; j++) {
        this.arr.push(leadMatrix[i][j]);
      }
    }
  }
  // 判断两个点Vertex是否存在边Edge
  getEdge(v, w) {
    return this.arr[((v + 1) * v) / 2 + w];
  }
  // 获取邻接点
  getAdjacentPoint(v) {
    const adjacentPoints: number[] = [];
    // 行
    for (let i = ((v + 1) * v) / 2; i < ((v + 1) * v) / 2 + i + 1; i++) {
      const w = this.arr[i];
      if (w) adjacentPoints.push(w);
    }
    // 列
  }
}

console.log(leadMatrixToLowerTriangle(leadMatrix));
// function DFS(params: type) {}
