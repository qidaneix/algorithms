/**
 * 图的邻接表表示法
 */
const adjacencyList = [
  { vertex: 0, next: { vertex: 1, next: { vertex: 3 } } },
  {
    vertex: 1,
    next: {
      vertex: 0,
      next: { vertex: 3, next: { vertex: 2, next: { vertex: 5 } } },
    },
  },
  {
    vertex: 2,
    next: {
      vertex: 1,
      next: { vertex: 5, next: { vertex: 4 } },
    },
  },
  {
    vertex: 3,
    next: {
      vertex: 0,
      next: { vertex: 1, next: { vertex: 6, next: { vertex: 6 } } },
    },
  },
  {
    vertex: 4,
    next: {
      vertex: 2,
      next: { vertex: 5, next: { vertex: 9 } },
    },
  },
  {
    vertex: 5,
    next: {
      vertex: 1,
      next: {
        vertex: 2,
        next: {
          vertex: 4,
          next: { vertex: 6, next: { vertex: 8, next: { vertex: 9 } } },
        },
      },
    },
  },
  {
    vertex: 6,
    next: {
      vertex: 3,
      next: { vertex: 5, next: { vertex: 7, next: { vertex: 8 } } },
    },
  },
  {
    vertex: 7,
    next: {
      vertex: 3,
      next: { vertex: 6 },
    },
  },
  { vertex: 8, next: { vertex: 5, next: { vertex: 6, next: { vertex: 9 } } } },
  { vertex: 9, next: { vertex: 4, next: { vertex: 5, next: { vertex: 8 } } } },
];
