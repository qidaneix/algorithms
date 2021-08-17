/**
 * 最大子序和
 */
/**
 * 基础版
 * 算法复杂度 O(n^3)
 */
function f1(arr) {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      let thisSum = 0;
      for (let k = i; k <= j; k++) {
        thisSum += arr[k];
      }
      if (thisSum > res) {
        res = thisSum;
      }
    }
  }
  return res > 0 ? res : 0;
}

f1([1, 2, 0, -4, 5, 7]);
f1([3, 2, 0, -4, 5, 7]);

/**
 * 高阶版
 * 算法复杂度 O(n^2)
 */
function f2(array) {
  let res = 0;
  for (let i = 0; i < array.length; i++) {
    let thisSum = 0;
    for (let j = i; j < array.length; j++) {
      thisSum += array[j];
      if (thisSum > res) {
        res = thisSum;
      }
    }
  }
  return res;
}
f2([1, 2, 0, -4, 5, 7]);
f2([3, 2, 0, -4, 5, 7]);

/**
 * 分治法
 * 算法复杂度 O(n*lgn)
 */
function f3(arr) {}
