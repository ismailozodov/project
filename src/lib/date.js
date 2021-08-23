export default function () {
	const d = new Date()

	let hour = ('' + (d.getHours())).padStart(2, 0)
	let minute = ('' + (d.getMinutes())).padStart(2, 0)

	return `${hour}:${minute}`
}