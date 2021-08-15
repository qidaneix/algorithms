/**
 * 归并排序
 */
function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    function sort (leftArr, rightArr) {
        const newArr = [];
        while(leftArr.length || rightArr.length) {
            if (!leftArr.length) {
                newArr.push(rightArr.shift())
            } else if (!rightArr.length) {
                newArr.push(leftArr.shift())
            } else if (leftArr[0] > rightArr[0]) {
                newArr.push(rightArr.shift())
            } else {
                newArr.push(leftArr.shift())
            }
        }
        return newArr;
    }
    return sort(mergeSort(left), mergeSort(right));
}

mergeSort([3,4,1,4,6,9,3,4,2,6,6,4])
mergeSort([3,3,4,2,6,6,4])