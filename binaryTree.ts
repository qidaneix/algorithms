/**
 * 堆栈先声明
 */
interface stack {
  push: (item: any) => any;
  pop: () => any;
  isEmpty: () => boolean;
}

class Stack implements stack {
  constructor() {
    this.arr = new Array();
  }

  private arr: any[] = [];

  push(item: any) {
    this.arr.push(item);
    return item;
  }

  pop() {
    if (this.arr.length) {
      return this.arr.pop();
    }
    throw new Error("the stack is empty");
  }

  isEmpty() {
    return !this.arr.length;
  }
}

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

  /**
   * TODO:
   */
  // postOrderWithSack() {
  //   const arr: any[] = [];
  //   const stack = new Stack();
  //   let node: any = this.data;
  //   while (node || !stack.isEmpty()) {
  //     while (node) {
  //       stack.push(node);
  //       node = node.left;
  //     }

  //     if (!stack.isEmpty()) {
  //       node = stack.pop();
  //       node = node.right;
  //     }
  //   }
  //   return arr;
  // }
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
