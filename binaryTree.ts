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

  inOrderSack() {

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
console.log(BT.inOrder());
console.log(BT.postOrder());

class Stack {
  constructor() {
    this.arr: any[] = new Array();
  }

  push(item) {
    this.arr.push(item);
    return item;
  }

  pop() {
    if (this.arr.length) {
      return this.arr.pop();
    }
    throw new Error("the stack is empty");
  }
}
