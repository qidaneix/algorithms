class TheSet {
  data: number[] = [];
  constructor(args: number[]) {
    this.data = args;
  }
  find(x: number) {
    while (this.data[x] > 0) {
      x = this.data[x];
    }
    return x;
  }
  union(x: number, y: number) {
    this.data[x] = y;
  }
}
