function getInterval(arr, from, to) {
	let errorMessageArr = `В функцию getInterval были переданы невалидные параметры.
		Параметр arr должен содержать только числовые значения`;
	let errorMessageFrom = `В функцию getInterval были переданы невалидные параметры.
		Параметр arr должен содержать только числовые значения`;
	let errorMessageTo = `В функцию getInterval были переданы невалидные параметры.
		Параметр to должен быть числом`;

	if (arr.some(i => typeof i !== 'number')) {
		throw new Error(errorMessageArr);
	}
	if (typeof from !== 'number') {
		throw new Error(errorMessageFrom);
	}
	if (typeof to !== 'number') {
		throw new Error(errorMessageTo);
	}
	if (from < to) {
		return arr.filter(i => i >= from && i <= to);
	}
	if (from > to) {
		return arr.filter(i => i >= to && i <= from);
	}
}
