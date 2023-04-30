export function getItem(key) {
	try {
		const rawData = localStorage.getItem(key);
		return rawData ? JSON.parse(rawData) : null;
	} catch (error) {
		console.error(`Error getting item from localStorage: ${error}`);
		return null;
	}
}

export function setItem(key, data) {
	try {
		const rawData = JSON.stringify(data);
		localStorage.setItem(key, rawData);
	} catch (error) {
		console.error(`Error setting item in localStorage: ${error}`);
	}
}

export function clearStorage() {
	try {
		localStorage.clear();
	} catch (error) {
		console.error(`Error setting item in localStorage: ${error}`);
	}
}
