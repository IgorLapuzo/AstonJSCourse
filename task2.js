function getNumberRadix(number, radix) {
	let errorMessage = 'Функция getNumberRadix была вызвана с некорректными параметрами.';
	if (isNaN(number) || +number <= 0 || radix < 2 || radix > 16) {
		throw Error(errorMessage);
	}
	return +number.toString(radix);
}
