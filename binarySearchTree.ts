interface binarySearchTree {
  data?: number;
  left?: binarySearchTree;
  right?: binarySearchTree;
}

const obj: binarySearchTree = {
  data: 9,
  left: {
    data: 6,
    left: {
      data: 3,
    },
    right: {
      data: 8,
      left: {
        data: 7,
      },
    },
  },
  right: {
    data: 14,
    left: {
      data: 12,
      right: {
        data: 13,
      },
    },
    right: {
      data: 16,
    },
  },
};

class BinarySearchTree {
  data: binarySearchTree;
  constructor(obj) {
    this.data = obj;
  }
  find(x: number) {
    function f(bst: binarySearchTree) {
      if (!bst) return null;
      if (x === bst.data) return bst;
      if (x < bst.data) return f(bst.left);
      if (x > bst.data) return f(bst.right);
    }
    return f(this.data);
  }
  findWithoutRe(x: number) {
    let node = this.data;
    while (node) {
      if (node.data === x) {
        return node;
      }
      if (node.data > x) {
        node = node.left;
      } else if (node.data < x) {
        node = node.right;
      }
    }
    return null;
  }
  findMin() {
    function f(bst: binarySearchTree) {
      if (bst.left) f(bst.left);
      return bst.data;
    }
    return f(this.data);
  }
  findMinWithoutRe() {
    let node = this.data;
    while (node.left) node = node.left;
    return node.data;
  }
  findMax() {
    function f(bst: binarySearchTree) {
      if (bst.right) f(bst.right);
      return bst.data;
    }
    return f(this.data);
  }
  findMaxWithoutRe() {
    let node = this.data;
    while (node.right) node = node.right;
    return node.data;
  }
  insert(x: number) {
    function f(bst: binarySearchTree) {
      if (x > bst.data) {
        if (!bst.right) {
          bst.right.data = x;
          return;
        }
        f(bst.right);
      } else if (x < bst.left) {
        if (!bst.left) {
          bst.left.data = x;
          return;
        }
        f(bst.left);
      }
    }
    f(this.data);
    return this.data;
  }
  delete(x: number) {}
}
