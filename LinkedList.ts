const linkedList = {
  data: "a",
  next: {
    data: "b",
    next: {
      data: "c",
      next: {
        data: "d",
        next: null,
      },
    },
  },
};

interface node {
  data: any;
  next: node | null;
}

class Node implements node {
  data: any;
  next: null;
  constructor(data: any) {
    this.data = data;
  }
}

class LinkedList {
  private obj: node | null;
  constructor() {
    this.obj = new Node("HEAD");
  }
  getLength() {
    let i = -1;
    let item = this.obj;
    while (item) {
      item = (this.obj as any).next;
      i += 1;
    }
    return i;
  }
  push(node: node) {
    let item = this.obj;
    let preItem: node | null = null;
    while (item) {
      preItem = item;
      item = item.next;
    }
    (preItem as node).next = node;
  }
  findIndex(index: number) {
    let i = -1;
    let item = this.obj;
    while (item && i < index) {
      item = (this.obj as any).next;
      i += 1;
    }
    if (i === index) return item;
    return null;
  }
  find(data: any) {
    let item = this.obj;
    while (item && item.data !== data) {
      item = item.next;
    }
    return item;
  }
  insert(node: node, index: number) {
    let i = -1;
    let item = this.obj;
    while (item && i + 1 < index) {
      item = item.next;
    }
    if (i + 1 === index) {
      // 找到前一节点
      node.next = (item as node).next;
      (item as node).next = node;
    }
    throw new Error("do not");
  }
  delete(index: number) {
    let i = -1;
    let item = this.obj;
    while (item && i + 1 < index) {
      item = item.next;
    }
    if (i + 1 === index) {
      // 找到前一节点
      if ((item as node).next) {
        (item as node).next = ((item as node).next as node).next;
      } else {
        (item as node).next = null;
      }
    }
    throw new Error("do not");
  }
  get() {
    return this.obj;
  }
}
