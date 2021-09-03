import { MinHeap, HuffmanTree } from "./HuffmanTree.ts";

const obj = { a: 11, b: 22, c: 33, d: 66, e: 100, f: 55, g: 5 };
const arrNum = Object.keys(obj).map((key) => obj[key]);
const h = new MinHeap(...arrNum);
const ht = new HuffmanTree();

let preNum: number;
while (h.getMinHeap().length > 1) {
  preNum = ht.build(h.delete(), h.delete(), preNum);
}

console.log("tree", JSON.stringify(ht.getTree()));
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
