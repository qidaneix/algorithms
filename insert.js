function insertSort(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > key; j -= 1) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = key;
  }
  return arr;
}
insertSort([3, 6, 2, 1, 5, 7, 4, 0]);
