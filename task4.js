function getUniqArray(arr) {
	let errorMessage = `В getUniqArray был передан невалидный параметр. Аргумент arr
		должен быть массивом чисел`;

	if (arr.some(i => typeof i !== 'number')) {
		throw new Error(errorMessage);
	}
	return [...new Set(arr)];
}
