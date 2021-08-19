class Queue {
  constructor() {
    this.arr = new Array();
  }

  push(item) {
    this.arr.push(item);
    return item;
  }

  shift() {
    if (this.arr.length) {
      return this.arr.shift();
    }
    throw new Error("the Queue is empty");
  }
}
