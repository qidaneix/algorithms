function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        const m = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = m;
      }
    }
  }

  return arr;
}
console.log(bubbleSort([3, 6, 2, 1, 5, 7, 4, 0]));
