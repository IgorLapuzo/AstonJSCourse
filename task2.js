function getInterval(arr, from, to) {
	const getErrorMessageArr = (paramName) => `В функцию getInterval были переданы невалидные параметры.
		Параметр ${paramName} должен содержать только числовые значения`;
	const getErrorMessage = (paramName) => `В функцию getInterval были переданы невалидные параметры.
		Параметр ${paramName} должен быть числом`;
		
	const isNumber = (num) => !Number.isNaN(num) && typeof num === 'number';
	const isNumberArray = (numberArr) => Array.isArray(numberArr) && !(numberArr.some((item) => !isNumber(item)));

	const errorHandling = (arr, from, to) => {
  	if (!isNumberArray(arr)) throw new Error(getErrorMessageArr('arr'));
  	if (!isNumber(from)) throw new Error(getErrorMessage('from'));
  	if (!isNumber(to)) throw new Error(getErrorMessage('to'));
	}

	errorHandling(arr, from, to)

	if (from < to) {
		return arr.filter(i => i >= from && i <= to);
	}
	if (from > to) {
		return arr.filter(i => i >= to && i <= from);
	}
}
