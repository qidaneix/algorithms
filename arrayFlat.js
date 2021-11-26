function flat(array, deep) {
  const res = [];
  function re(arr, d) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && d) {
        re(arr[i], d - 1);
      } else {
        res.push(arr[i]);
      }
    }
  }
  re(array, deep);
  return res;
}

console.log(flat([1, [2, [3, 4], 5], 6, 7], 2));
