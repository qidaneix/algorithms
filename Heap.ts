class Heap {
  data: number[] = [];
  constructor(...arg: number[]) {
    this.data = [Infinity, ...arg];
    this.build();
  }

  build() {
    const f = (xIndex: number) => {
      const length = this.data.length;
      const x = this.data[xIndex];
      while (xIndex * 2 < length) {
        const lChildIdx = xIndex * 2;
        const rChildIdx = xIndex * 2 + 1;
        if (lChildIdx === length - 1) {
          if (this.data[lChildIdx] > x) {
            this.data[xIndex] = this.data[lChildIdx];
            this.data[lChildIdx] = x;
          }
          break;
        } else {
          const lChild = this.data[lChildIdx];
          const rChild = this.data[rChildIdx];
          if (x > lChild && x > rChild) {
            break;
          } else if (lChild > rChild) {
            this.data[xIndex] = this.data[lChildIdx];
            this.data[lChildIdx] = x;
            xIndex = lChildIdx;
          } else {
            this.data[xIndex] = this.data[rChildIdx];
            this.data[rChildIdx] = x;
            xIndex = rChildIdx;
          }
        }
      }
      //   for (let i = xIndex; i * 2 < this.data.length; ) {
      //     const lChildIdx = i * 2;
      //     const rChildIdx = i * 2 + 1;
      //     if (lChildIdx === length - 1) {
      //       if (this.data[lChildIdx] > x) {
      //         this.data[i] = this.data[lChildIdx];
      //         this.data[lChildIdx] = x;
      //       }
      //       break;
      //     } else {
      //       const lChild = this.data[lChildIdx];
      //       const rChild = this.data[rChildIdx];
      //       if (x > lChild && x > rChild) {
      //         break;
      //       } else if (lChild > rChild) {
      //         this.data[i] = this.data[lChildIdx];
      //         this.data[lChildIdx] = x;
      //         i = lChildIdx;
      //       } else {
      //         this.data[i] = this.data[rChildIdx];
      //         this.data[rChildIdx] = x;
      //         i = rChildIdx;
      //       }
      //     }
      //   }
    };

    const lastIdx = this.data.length - 1;
    const pIdx = Math.floor(lastIdx / 2);
    for (let i = pIdx; i > 0; i--) {
      f(i);
    }
  }

  insert(x: number) {
    let xIndex = this.data.length;
    this.data[xIndex] = x;
    while (true) {
      const pIndex = Math.floor(xIndex / 2);
      const parent = this.data[pIndex];
      if (parent >= x) break;
      else {
        this.data[pIndex] = x;
        this.data[xIndex] = parent;
        xIndex = pIndex;
      }
    }
  }

  getMax() {
    const max = this.data[1];
    const x = this.data.pop() as number;
    let xIndex = 1;
    this.data[xIndex] = x;
    const length = this.data.length;
    while (xIndex * 2 < length) {
      const lChildIdx = xIndex * 2;
      const rChildIdx = xIndex * 2 + 1;
      if (lChildIdx === length - 1) {
        if (this.data[lChildIdx] > x) {
          this.data[xIndex] = this.data[lChildIdx];
          this.data[lChildIdx] = x;
        }
        break;
      } else {
        const lChild = this.data[lChildIdx];
        const rChild = this.data[rChildIdx];
        if (x > lChild && x > rChild) {
          break;
        } else if (lChild > rChild) {
          this.data[xIndex] = this.data[lChildIdx];
          this.data[lChildIdx] = x;
          xIndex = lChildIdx;
        } else {
          this.data[xIndex] = this.data[rChildIdx];
          this.data[rChildIdx] = x;
          xIndex = rChildIdx;
        }
      }
    }
    return max;
  }

  getHeap() {
    return this.data;
  }
}

const h = new Heap(11, 14, 15, 13, 16, 19, 18, 17);
console.log(h.getHeap());
h.insert(1);
h.insert(2);
h.insert(3);
h.insert(4);
h.insert(5);
h.insert(6);
h.insert(7);
h.insert(8);
h.insert(9);
h.insert(99);
h.insert(98);
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
h.getMax();
console.log(h.getHeap());
