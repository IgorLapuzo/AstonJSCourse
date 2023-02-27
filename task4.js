function getUniqArray(arr) {
	let errorMessage = `В getUniqArray был передан невалидный параметр. Аргумент arr
		должен быть массивом чисел`;

	if (!Array.isArray(arr) || arr.some((item) => Number.isNaN(item)) || arr.some(item => typeof item !== 'number')) {
		throw new Error(errorMessage);
	}
	return [...new Set(arr)];
}
