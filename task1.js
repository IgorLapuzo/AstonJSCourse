function deepCopyObject(obj) {
	let cloneObj = {};
	for (let key in obj) {
		if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			cloneObj[key] = deepCopyObject(obj[key]);
		} else if (Array.isArray(obj[key])) {
			cloneObj[key] = [];
			for (let innerKey of obj[key]) {
				cloneObj[key].push(deepCopyObject(innerKey));
			}
		} else {
			cloneObj[key] = obj[key];
		}
	}
	return cloneObj;
}
