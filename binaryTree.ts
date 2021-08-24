import { Stack } from "./Stack.ts";
import { Queue } from "./Queue.ts";

interface binaryTree {
  data?: any;
  left?: binaryTree;
  right?: binaryTree;
}

class BinaryTree {
  constructor(obj: binaryTree) {
    this.data = obj;
  }

  data: binaryTree;

  preOrder() {
    const arr: string[] = [];
    function f(bT: binaryTree) {
      arr.push(bT.data);
      if (bT.left) {
        f(bT.left);
      }
      if (bT.right) {
        f(bT.right);
      }
    }
    f(this.data);
    return arr;
  }

  preOrderWithSack() {
    const arr: any[] = [];
    const stack = new Stack();
    let node: any = this.data;
    while (node || !stack.isEmpty()) {
      while (node) {
        arr.push(node.data);
        stack.push(node);
        node = node.left;
      }

      if (!stack.isEmpty()) {
        node = stack.pop();
        node = node.right;
      }
    }
    return arr;
  }

  inOrder() {
    const arr: string[] = [];
    function f(bT: binaryTree) {
      if (bT.left) {
        f(bT.left);
      }
      arr.push(bT.data);
      if (bT.right) {
        f(bT.right);
      }
    }
    f(this.data);
    return arr;
  }

  inOrderWithSack() {
    const arr: any[] = [];
    const stack = new Stack();
    let node: any = this.data;
    while (node || !stack.isEmpty()) {
      while (node) {
        stack.push(node);
        node = node.left;
      }

      if (!stack.isEmpty()) {
        node = stack.pop();
        arr.push(node.data);
        node = node.right;
      }
    }
    return arr;
  }

  postOrder() {
    const arr: string[] = [];
    function f(bT: binaryTree) {
      if (bT.left) {
        f(bT.left);
      }
      if (bT.right) {
        f(bT.right);
      }
      arr.push(bT.data);
    }
    f(this.data);
    return arr;
  }

  postOrderWithSack() {
    const arr: any[] = [];
    const stack = new Stack();
    let visited: any = null;
    let node: any = this.data;

    while (node || !stack.isEmpty()) {
      while (node) {
        stack.push(node);
        node = node.left;
      }

      if (!stack.isEmpty()) {
        node = stack.pop();
        if (!node.right || node.right === visited) {
          arr.push(node.data);
          visited = node;
          node = null;
        } else {
          stack.push(node);
          node = node.right;
        }
      }
    }

    return arr;
  }

  sequence() {
    const q = new Queue();
    const arr: any = [];
    q.push(this.data);
    while (!q.isEmpty()) {
      const node = q.shift();
      arr.push(node.data);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    return arr;
  }

  getLeaf() {
    const arr: any[] = [];
    const stack = new Stack();
    let node: any = this.data;
    while (node || !stack.isEmpty()) {
      while (node) {
        stack.push(node);
        node = node.left;
      }

      if (!stack.isEmpty()) {
        node = stack.pop();
        if (!node.left && !node.right) arr.push(node.data);
        node = node.right;
      }
    }
    return arr;
  }

  getHeight() {
    function reHeight(bT: any): number {
      if (!bT) return 0;
      return Math.max(reHeight(bT.left), reHeight(bT.right)) + 1;
    }
    return reHeight(this.data);
  }
}

const obj: binaryTree = {
  data: "a",
  left: {
    data: "b",
    left: {
      data: "d",
    },
    right: {
      data: "f",
      left: {
        data: "e",
      },
    },
  },
  right: {
    data: "c",
    left: {
      data: "g",
      right: {
        data: "h",
      },
    },
    right: {
      data: "i",
    },
  },
};

const BT = new BinaryTree(obj);
console.log(BT.preOrder());
console.log(BT.preOrderWithSack()); // 堆栈在这里其实是一个存储功能
console.log(BT.inOrder());
console.log(BT.inOrderWithSack());
console.log(BT.postOrder());
console.log(BT.postOrderWithSack());
console.log(BT.sequence());
console.log(BT.getLeaf());
console.log(BT.getHeight());
