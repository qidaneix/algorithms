// 平衡搜索树
interface avlTree {
  data: number;
  left?: avlTree;
  right?: avlTree;
  height: number;
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
  static getHeight(node: avlTree | undefined): number {
    if (!node) return 0;
    return Math.max(this.getHeight(node.left) + this.getHeight(node.right)) + 1;
  }

  static llWhirl(node: avlTree) {
    const newTop = node.left as avlTree;
    node.left = newTop.right;
    newTop.right = node;
    newTop.height = this.getHeight(newTop);
    newTop.right.height = this.getHeight(newTop.right);
    return newTop;
  }

  static rrWhirl(node: avlTree) {
    const newTop = node.right as avlTree;
    node.right = newTop.left;
    newTop.left = node;
    newTop.height = this.getHeight(newTop);
    newTop.left.height = this.getHeight(newTop.right);
    return newTop;
  }

  static lrWhirl(node: avlTree) {
    node.left = this.rrWhirl(node.left as avlTree);
    return this.llWhirl(node);
  }

  static rlWhirl(node: avlTree) {
    node.right = this.llWhirl(node.right as avlTree);
    return this.rrWhirl(node);
  }

  static insert(x: number, node: avlTree | undefined) {
    if (!node) {
      node = { data: x, height: 0 };
    } else if (x > node.data) {
      node.right = this.insert(x, node.right);
      if (this.getHeight(node.right) - this.getHeight(node.left) >= 2) {
        if (x === node.right.right?.data) {
          node = this.rrWhirl(node);
        } else {
          node = this.rlWhirl(node);
        }
      }
    } else if (x < node.data) {
      node.left = this.insert(x, node.left);
      if (this.getHeight(node.left) - this.getHeight(node.right) >= 2) {
        if (x === node.left.left?.data) {
          node = this.llWhirl(node);
        } else {
          node = this.lrWhirl(node);
        }
      }
    }
    node.height = this.getHeight(node);
    return node;
  }
}

console.log(AVLTree.insert(5, avl));
console.log(AVLTree.insert(20, avl));
