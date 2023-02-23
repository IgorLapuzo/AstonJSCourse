function addElementsToArray(arr, index) {
  if (index && (index < 0 || !Number.isInteger(index))) {
    throw new Error ("The index cannot be a negative number or a fractional number");
  }
  if (index === 0) {
    return function (...elem) {
      return [...elem, ...arr];
    } 
  }
  if (index > 0 && index < arr.length) {
    return function (...elem) {
      return [...arr.slice(0, index), ...elem, ...arr.slice(index)];
    } 
  }
  if (index >= arr.length || !index) {
    return function (...elem) {
      return [...arr, ...elem];
    } 
  }
}