/**
 * 大数相减，减数num1，被减数num2
 * 分情况：
 * 1. num1，num2 均为正数
 *   a. num1大于num2  => num1 - num2
 *   b. num1小于num2  => -(num2 - num1)
 * 2. num1，num2 均为负数
 *   a. num1大于num2  => (-num2)-(-num1)
 *   b. num1小于num2  => -((-num1)-(-num2))
 * 3. num1为负，num2为正数
 *   => -((-num1) + num2)
 * 4. num1为正，num2为负
 *   => num1 + (-num2)
 */
function isZ(num) {
  return !num.startsWith("-");
}

function judge(num1, num2) {
  const isNum1Z = isZ(num1);
  const isNum2Z = isZ(num2);
  if (isNum1Z && isNum2Z) {
    const compareRes = compare(num1, num2, true);
    if (compareRes === "bigger") return sub(num1, num2);
    if (compareRes === "smaller") return `-${sub(num2, num1)}`;
    if (compareRes === "same") return "0";
  } else if (!isNum1Z && !isNum2Z) {
    const compareRes = compare(num1, num2, false);
    if (compareRes === "bigger") return sub(num2.slice(1), num1.slice(1));
    if (compareRes === "smaller")
      return `-${sub(num1.slice(1), num2.slice(1))}`;
    if (compareRes === "same") return "0";
  } else if (!isNum1Z && isNum2Z) {
    // 大数相加
    return `-${add(num1.slice(1), num2)}`;
  } else {
    // 大数相加
    return `${add(num1, num2.slice(1))}`;
  }
}

function compare(num1, num2, isZ) {
  if (isZ) {
    if (num1.length > num2.length) return "bigger";
    if (num1.length < num2.length) return "smaller";
  } else {
    if (num1.length > num2.length) return "smaller";
    if (num1.length < num2.length) return "bigger";
  }
  return compareSame(num1, num2, isZ);
}

function compareSame(num1, num2, isZ) {
  for (let i = isZ ? 0 : 1; i < num1.length; i++) {
    if (parseInt(num1[i], 10) > parseInt(num2[i], 10))
      return isZ ? "bigger" : "smaller";
    if (parseInt(num1[i], 10) < parseInt(num2[i], 10))
      return isZ ? "smaller" : "bigger";
  }
  return "same";
}

/**
 * 大数相加
 * @param {string} num1
 * @param {string} num2
 * @returns {string} sum
 */
function add(num1, num2) {
  const num1Arr = num1.split("");
  const num2Arr = num2.split("");
  let sum = "";
  let jw = 0;
  while (num1Arr.length || num2Arr.length) {
    let thisSum = 0;
    if (num1Arr.length && num2Arr.length) {
      const o1 = parseInt(num1Arr.pop());
      const o2 = parseInt(num2Arr.pop());
      thisSum = o1 + o2 + jw;
    } else if (num1Arr.length) {
      const o = parseInt(num1Arr.pop());
      thisSum = o + jw;
    } else {
      const o = parseInt(num2Arr.pop());
      thisSum = o + jw;
    }
    if (thisSum > 9) {
      jw = Math.floor(thisSum / 10);
      sum = thisSum - jw * 10 + sum;
    } else {
      jw = 0;
      sum = thisSum + sum;
    }
  }
  if (jw) sum = jw + sum;
  return sum;
}

/**
 * 大数相减
 */
function sub(num1, num2) {
  const num1Arr = num1.split("");
  const num2Arr = num2.split("");
  let jw = 0;
  let res = "";
  while (num1Arr.length) {
    let o1 = parseInt(num1Arr.pop());
    let o2 = 0;
    if (num2Arr.length) o2 = parseInt(num2Arr.pop());
    let thisSub = o1 - jw - o2;
    if (thisSub >= 0) {
      res = thisSub + res;
      jw = 0;
    } else {
      thisSub = 10 + o1 - jw - o2;
      res = thisSub + res;
      jw = 1;
    }
  }
  return res;
}
