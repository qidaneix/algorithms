interface binarySearchTree {
  data: number;
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
  constructor(obj: binarySearchTree) {
    this.data = obj;
  }
  find(x: number) {
    function f(bst: binarySearchTree | undefined): any {
      if (!bst) return null;
      if (x === bst.data) return bst;
      if (x < bst.data) return f(bst.left);
      if (x > bst.data) return f(bst.right);
    }
    return f(this.data);
  }
  findWithoutRe(x: number) {
    let node: binarySearchTree | undefined = this.data;
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
    function f(bst: binarySearchTree): any {
      if (!bst.left) return bst;
      return f(bst.left);
    }
    return f(this.data);
  }
  findMinWithoutRe() {
    let node = this.data;
    while (node.left) node = node.left;
    return node;
  }
  findMax() {
    function f(bst: binarySearchTree): any {
      if (!bst.right) return bst;
      return f(bst.right);
    }
    return f(this.data);
  }
  findMaxWithoutRe() {
    let node = this.data;
    while (node.right) node = node.right;
    return node;
  }
  insert(x: number) {
    function f(bst: binarySearchTree) {
      if (x > bst.data) {
        if (!bst.right) {
          bst.right = { data: x };
          return;
        }
        f(bst.right);
      } else if (x < bst.data) {
        if (!bst.left) {
          bst.left = { data: x };
          return;
        }
        f(bst.left);
      }
    }
    f(this.data);
    return this.data;
  }
  delete(x: number) {
    function findMaxWithoutRe(bst: binarySearchTree) {
      let node = bst;
      while (node.right) node = node.right;
      return node;
    }
    function d(
      delNum: number,
      bst: binarySearchTree | undefined
    ): binarySearchTree | undefined {
      if (!bst) throw new Error("do not");
      if (delNum > bst.data) {
        // 向右
        bst.right = d(delNum, bst.right);
      } else if (delNum < bst.data) {
        // 向左
        bst.left = d(delNum, bst.right);
      } else {
        //找到
        if (bst.left && bst.right) {
          // 左子树找最大节点值
          const leftMaxNode = findMaxWithoutRe(bst.left);
          bst.data = leftMaxNode.data;
          bst.left = d(leftMaxNode.data, bst.left);
        } else {
          if (bst.left) {
            bst = bst.left;
          } else if (bst.right) {
            bst = bst.right;
          } else {
            bst = undefined;
          }
        }
      }
      return bst;
    }
    d(x, this.data);
    return this.data;
  }
}

const BST = new BinarySearchTree(obj);
console.log(BST.find(14));
console.log(BST.findWithoutRe(14));
console.log(BST.findMin());
console.log(BST.findMinWithoutRe());
console.log(BST.findMax());
console.log(BST.findMaxWithoutRe());
console.log(BST.insert(5));
console.log(BST.insert(20));
console.log(BST.delete(14));
