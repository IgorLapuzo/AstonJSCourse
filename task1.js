function deleteElementFromArray(arr, elem) {
  let arrCopy = [...arr];
  if (arrCopy.includes(elem)) {
    arrCopy.splice(arrCopy.findIndex(x => x === elem), 1);
    return arrCopy;
  }
  return arr;
}