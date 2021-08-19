function find(array, the) {
  for (let i = 0; i < array.length; i++) {
    if (the === array[i]) {
      return i;
    }
  }
  return -1;
}
