export class Queue {
  constructor() {
    this.arr = new Array();
  }

  arr: any[];

  push(item: any) {
    this.arr.push(item);
    return item;
  }

  shift() {
    if (this.arr.length) {
      return this.arr.shift();
    }
    throw new Error("the Queue is empty");
  }

  isEmpty() {
    return !this.arr.length;
  }
}
