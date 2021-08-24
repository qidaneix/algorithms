export class Stack {
  constructor() {
    this.arr = new Array();
  }

  arr: any[];

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
