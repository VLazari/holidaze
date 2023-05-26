/**
 * The function calculate the number of nights between the two given days.
 * @param {new Date} startDay
 * @param {new Date} endDay
 * @returns the number of nights or null.
 */
export default function getNumberOfNights(startDay, endDay) {
	if (startDay && endDay) {
		const timeDiff = Math.abs(endDay.getTime() - startDay.getTime());
		const numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return numberOfNights;
	}
	return null;
}
