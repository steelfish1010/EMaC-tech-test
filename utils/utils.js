const filterArrayMultipleTimes = (arr, exclude_value) => {
	if (!exclude_value || !exclude_value.length) {
		return [...arr];
	}

	if (exclude_value.length === 1) {
		return arr.filter((obj) => {
			return obj.name !== exclude_value[0];
		});
	} else {
		const filteredArr = arr.filter((obj) => {
			return obj.name !== exclude_value[0];
		});
		const newExcludeArr = exclude_value.splice(1);
		return filterArrayMultipleTimes(filteredArr, newExcludeArr);
	}
};

module.exports = { filterArrayMultipleTimes };
