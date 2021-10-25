function binarySearch(arr, val) {
  let index = 0;

  function search(array) {
    if (array.length === 2) {
      if (Math.abs(array[0] - val) > Math.abs(array[1] - val)) {
        return index + 1;
      } else {
        return index;
      }
    }
    const middle = Math.floor(array.length / 2);
    if (array[middle - 1] === val) {
      index += middle - 1;
      return index;
    } else if (array[middle] === val) {
      index += middle;
      return index;
    } else if (array[middle - 1] > val) {
      index += 0;
      search(array.slice(0, middle));
    } else if (array[middle] < val) {
      index += middle;
      search(array.slice(middle));
    } else if (
      Math.abs(array[middle - 1] - val) > Math.abs(array[middle] - val)
    ) {
      index += middle;
    } else {
      index += middle - 1;
    }
  }
  search(arr);
  return index;
}

// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 2));
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 7));
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));
// console.log(binarySearch([1, 2, 3, 5, 6, 7, 8, 9], 4));
// console.log(binarySearch([1, 2, 3, 7, 8, 9], 4));

function binarySearchMyself(array, x) {
  function find(top, end) {
    // if (end - top === 1) {
    //   return array[top] === x ? top : -1;
    // }
    const middle = Math.floor((top + end) / 2);
    if (array[middle - 1] === x) {
      return middle - 1;
    } else if (array[middle] === x) {
      return middle;
    } else if (array[middle - 1] > x) {
      return find(top, middle);
    } else if (array[middle] < x) {
      return find(middle, end);
    } else {
      return -1;
    }
  }

  return find(0, array.length);
}
console.log(binarySearchMyself([1, 2, 3, 4, 5, 6, 7, 8, 9], 2));
console.log(binarySearchMyself([1, 2, 3, 4, 5, 6, 7, 8], 7));
console.log(binarySearchMyself([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));
console.log(binarySearchMyself([1, 2, 3, 5, 6, 7, 8, 9], 4));
console.log(binarySearchMyself([1, 2, 3, 7, 8, 9], 4));
