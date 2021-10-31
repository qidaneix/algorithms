import { Stack } from "./Stack.ts";
interface huffmanTree {
  data: number;
  left?: huffmanTree;
  right?: huffmanTree;
}

/**
 * 最优二叉树
 */
export class HuffmanTree {
  obj: huffmanTree;

  constructor() {
    this.obj = null;
  }

  build(left: number, right: number, presentMin?: number) {
    if (!presentMin) {
      this.obj = {
        data: left + right,
        left: { data: left },
        right: { data: right },
      };
      return this.obj.data;
    }

    if (!right) {
      this.obj = {
        data: presentMin + left,
        left: this.obj,
        right: { data: left },
      };
      return this.obj.data;
    }

    if (presentMin < right) {
      this.obj = {
        data: presentMin + left + right,
        left: {
          data: presentMin + left,
          left: this.obj,
          right: { data: left },
        },
        right: { data: right },
      };
      return this.obj.data;
    }

    this.obj = {
      data: presentMin + left + right,
      left: this.obj,
      right: {
        left: { data: left },
        right: { data: right },
        data: left + right,
      },
    };
    return this.obj.data;
  }

  // 遍历计算权重
  calc() {
    const arr: { value: number; deep: number }[] = [];
    let i = 0;
    const f = (node: huffmanTree) => {
      if (!node.left && !node.right) arr.push({ value: node.data, deep: i });
      if (node.left) {
        i += 1;
        f(node.left);
      }

      if (node.right) {
        i += 1;
        f(node.right);
      }

      i -= 1;
    };
    f(this.obj);
    return arr;
  }

  // coding
  coding() {
    const arr: { value: number; code: string }[] = [];
    const codeArr: ("1" | "0")[] = [];
    const f = (node: huffmanTree) => {
      if (!node.left && !node.right)
        arr.push({ value: node.data, code: codeArr.join("") });
      if (node.left) {
        codeArr.push("0");
        f(node.left);
      }

      if (node.right) {
        codeArr.push("1");
        f(node.right);
      }

      codeArr.pop();
    };
    f(this.obj);
    return arr;
  }

  getTree() {
    return this.obj;
  }
}

/**
 * 最小堆
 */
export class MinHeap {
  data: number[] = [];
  constructor(...arg: number[]) {
    this.data = [-Infinity, ...arg];
    this.build();
  }
  build() {
    const f = (xIdx: number) => {
      const length = this.data.length;
      const x = this.data[xIdx];
      while (xIdx * 2 < length) {
        const lChildIdx = xIdx * 2;
        const rChildIdx = xIdx * 2 + 1;
        const lChild = this.data[lChildIdx];
        const rChild = this.data[rChildIdx];
        if (lChildIdx === length - 1) {
          if (lChild < x) {
            this.data[lChildIdx] = x;
            this.data[xIdx] = lChild;
          }
          break;
        }
        if (x < lChild && x < rChild) break;
        if (lChild > rChild) {
          this.data[rChildIdx] = x;
          this.data[xIdx] = rChild;
          xIdx = rChildIdx;
        } else {
          this.data[lChildIdx] = x;
          this.data[xIdx] = lChild;
          xIdx = lChildIdx;
        }
      }
    };
    const lastChildIdx = this.data.length - 1;
    const pIdx = Math.floor(lastChildIdx / 2);
    for (let i = pIdx; i > 0; i--) {
      f(i);
    }
  }

  delete() {
    let xIdx = 1;
    const min = this.data[xIdx];
    const x = this.data.pop();
    const length = this.data.length;
    if (length <= 1) {
      return min;
    }
    this.data[xIdx] = x;
    while (xIdx * 2 < length) {
      const lChildIdx = xIdx * 2;
      const rChildIdx = xIdx * 2 + 1;
      const lChild = this.data[lChildIdx];
      const rChild = this.data[rChildIdx];
      if (lChildIdx === length - 1) {
        if (lChild < x) {
          this.data[lChildIdx] = x;
          this.data[xIdx] = lChild;
        }
        break;
      }
      if (x < lChild && x < rChild) break;
      if (lChild > rChild) {
        this.data[rChildIdx] = x;
        this.data[xIdx] = rChild;
        xIdx = rChildIdx;
      } else if (lChild < rChild) {
        this.data[lChildIdx] = x;
        this.data[xIdx] = lChild;
        xIdx = lChildIdx;
      }
    }
    return min;
  }

  getMinHeap() {
    return this.data;
  }
}

const h = new MinHeap(11, 14, 15, 13, 16, 19, 18, 17);
// console.log(h.getMinHeap());
const ht = new HuffmanTree();
let preMin: number;
while (h.getMinHeap().length > 1) {
  const left = h.delete();
  const right = h.delete();
  preMin = ht.build(left, right, preMin);
}
// console.log(ht.getTree());
