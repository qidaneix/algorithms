class ArrayList {
  private data: any[];
  constructor(...args: any[]) {
    this.data = [...args];
  }
  find(item: any) {
    for (let i = 0; i < this.data.length; i++) {
      if (item === this.data[i]) {
        return i;
      }
    }
    return -1;
  }
  insert(item: any, index: number) {
    if (index > this.data.length || index < 0) {
      throw new Error("do not");
    }
    // 移动
    for (let i = this.data.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    return this.data;
  }
  delete(index: number) {
    if (index > this.data.length - 1 || index < 0) {
      throw new Error("do not");
    }
    for (let i = index; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data.pop();
    return this.data;
  }
}

const arr = new ArrayList(1, 2, 4, 5, 6, 7, 8);
console.log(arr.find(6));
console.log(arr.insert(3, 2));
console.log(arr.delete(2));
