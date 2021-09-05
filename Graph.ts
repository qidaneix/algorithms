// 数据对象集
interface G {}

// 定点
interface Vertex {}

// 边
interface Edge {}

/**
 * 图
 */
class Graph {
  static Create() {} // 建立并返回空图
  static InsertVertex(g: G, v: Vertex) {} // 将v插入G
  static InsertEdge(g: G, e: Edge) {} // e插入G
  static DFS(g: G, v: Vertex) {} // 深度遍历
  static BFS(g: G, v: Vertex) {} // 广度遍历
  static ShortestPath(v: Vertex, dist: number[]) {} // v 的最短路径
  static MST(g: G) {}
}
