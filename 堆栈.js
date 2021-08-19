class Stack {
  constructor() {
    this.arr = new Array();
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
