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
function f3(arr) {
  function compare(compArr) {
    let max;
    for (let i = 0; i < compArr.length; i++) {
      if (typeof max === "undefined" || compArr[i] > max) max = compArr[i];
    }
    return max;
  }

  function getMaxSum(array, left, right) {
    if (right - left === 1) {
      return array[left];
    }

    const middle = Math.floor((right + left) / 2);
    const leftMaxSum = getMaxSum(array, left, middle);
    const rightMaxSum = getMaxSum(array, middle, right);

    // 计算越过边界的长度
    let leftBoundSum;
    let rightBoundSum;
    // 左侧
    let tempSum = 0;
    for (let i = middle - 1; i >= left; i--) {
      tempSum += array[i];
      if (typeof leftBoundSum === "undefined" || tempSum > leftBoundSum)
        leftBoundSum = tempSum;
    }
    // 右侧
    tempSum = 0;
    for (let i = middle; i < right; i++) {
      tempSum += array[i];
      if (typeof rightBoundSum === "undefined" || tempSum > rightBoundSum)
        rightBoundSum = tempSum;
    }

    const boundSum = leftBoundSum + rightBoundSum;

    return compare([leftMaxSum, rightMaxSum, boundSum]);
  }

  console.log(getMaxSum(arr, 0, arr.length));
}
f3([1, 2, 0, -4, 5, 7]);
f3([5, 2]);
f3([-1, 2, 0, -4, 3, 7]);

/**
 * 动态规划？
 * 在线处理
 */
function f4(array) {
  let maxSum = -Infinity;
  let thisSum = 0;
  for (let i = 0; i < array.length; i++) {
    thisSum += array[i];
    if (thisSum > maxSum) maxSum = thisSum;
    else if (thisSum < 0) thisSum = 0;
  }
  console.log(maxSum);
}
f4([1, 2, 0, -4, 5, 7]);
f4([5, 2]);
f4([-1, 2, 0, -4, 3, 7]);
