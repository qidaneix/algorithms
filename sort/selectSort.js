function selectSort(array) {
  for (let i = 0; i < array.length; i++) {
    let replaced = array[i];
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) {
        array[i] = array[j];
        array[j] = replaced;
        replaced = array[i];
      }
    }
  }
  return array;
}
selectSort([3, 6, 2, 1, 5, 7, 4, 0]);
