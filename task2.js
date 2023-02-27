function getNumberRadix(number, radix) {
	const num = +number;
	let errorMessage = 'Функция getNumberRadix была вызвана с некорректными параметрами.';
	if (
		Number.isNaN(num) || 
		!Number.isInteger(num) ||
		num < 0 || 
		typeof radix !== 'number' ||
		radix < 2 || 
		radix > 16
		) throw new Error(errorMessage);

	return num.toString(radix);
}
