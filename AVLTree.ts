// 平衡搜索树
interface avlTree {
  data?: number;
  left?: avlTree;
  right?: avlTree;
  height?: number;
}

const avl: avlTree = {
  data: 9,
  height: 4,
  left: {
    data: 6,
    height: 3,
    left: {
      data: 3,
      height: 1,
    },
    right: {
      data: 8,
      height: 2,
      left: {
        data: 7,
        height: 1,
      },
    },
  },
  right: {
    data: 14,
    height: 3,
    left: {
      data: 12,
      height: 2,
      right: {
        data: 13,
        height: 1,
      },
    },
    right: {
      data: 16,
      height: 1,
    },
  },
};

class AVLTree {
  getHeight(node: avlTree | undefined) {
    if (!node) return 0;
    return Math.max(this.getHeight(node.left) + this.getHeight(node.right)) + 1;
  }

  llWhirl(node: avlTree) {
    const newTop = node.left;
    node.left = newTop.right;
    newTop.right = node;
    newTop.height = this.getHeight(newTop);
    newTop.right.height = this.getHeight(newTop.right);
    return newTop;
  }

  rrWhirl(node: avlTree) {
    const newTop = node.right;
    node.right = newTop.left;
    newTop.left = node;
    newTop.height = this.getHeight(newTop);
    newTop.left.height = this.getHeight(newTop.right);
    return newTop;
  }

  lrWhirl(node: avlTree) {
    node.left = this.rrWhirl(node.left);
    return this.llWhirl(node);
  }

  rlWhirl(node: avlTree) {
    node.right = this.llWhirl(node.right);
    return this.rrWhirl(node);
  }

  insert(x: number, node: avlTree) {
    if (!node) {
      node = { data: x, height: 0 };
    } else if (x > node.data) {
      node.right = this.insert(x, node.right);
    } else if (x < node.data) {
      node.left = this.insert(x, node.left);
    }
    return node;
  }
}
