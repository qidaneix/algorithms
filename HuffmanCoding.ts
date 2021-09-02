// import { MinHeap, HuffmanTree } from "./HuffmanTree.ts";

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
        left: { data: left },
        right: { data: right },
        data: left + right,
      };
      return this.obj.data;
    }
    if (presentMin > left && presentMin > right) {
      this.obj = {
        left: JSON.parse(JSON.stringify(this.obj)),
        right: {
          left: { data: left },
          right: { data: right },
          data: left + right,
        },
        data: presentMin + left + right,
      };
      return this.obj.data;
    }
    this.obj = {
      left: {
        left: JSON.parse(JSON.stringify(this.obj)),
        right: { data: left },
        data: presentMin + left,
      },
      right: { data: right },
      data: presentMin + left + right,
    };
    return this.obj.data;
  }
  // 层序遍历计算权重
  calc() {}

  // coding
  coding() {
    const arr: { value: number; code: string }[] = [];
    let i = 0;
    const f = (node: huffmanTree) => {
      if (node.left) {
        let code = "";
        for (let k = 0; k <= i; k++) {
          code += "0";
        }
        arr.push({ value: node.data, code });
        i += 1;
        f(node.left);
      }

      if (node.right) {
        let code = "";
        for (let k = 0; k <= i; k++) {
          if (k === i) code += "1";
          else code += "0";
        }
        arr.push({ value: node.data, code });
        i -= 1;
        f(node.right);
      }
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

const obj = { a: 11, b: 22, c: 33, d: 66, e: 100, f: 55, g: 5 };
const arrNum = Object.keys(obj).map((key) => obj[key]);
const h = new MinHeap(...arrNum);
const ht = new HuffmanTree();

let preNum: number;
while (h.getMinHeap().length > 1) {
  preNum = ht.build(h.delete(), h.delete(), preNum);
}

console.log("tree", ht.getTree());
const numDeep = ht.coding();
console.log("numDeep", numDeep);
const res = {};

numDeep.forEach((item) => {
  Object.keys(obj).forEach((key) => {
    if (item.value === obj[key]) {
      res[key] = item.code;
    }
  });
});
console.log("res", res);
