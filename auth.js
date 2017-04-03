const crypto = require('crypto')
const fs = require('fs')
//Returns formatted UTC date stamp
function formatDate() {
	var date = new Date(Date.now())
	var month = date.getMonth() + 1
	var day = date.getUTCDate().toString()
	var hours = date.getUTCHours()
	var minutes = date.getUTCMinutes().toString()

	function pad(date) {
		return (date < 10) ? "0" + date : date
	}
	// round minutes to previous multiple of 5
	var Oldminutes = parseInt(minutes)
	minutes = 5 * Math.round(Oldminutes / 5)
	if (Oldminutes < minutes) {
		minutes = minutes - 5
	}
	//return formatted date
	return date.getFullYear().toString() + pad(month) + pad(day) + pad(hours) + pad(minutes)
}
//join username and date
function joinNameAndDate(username, dateFunction) {
	return Buffer.from(username + dateFunction(), 'ascii')
}
//create hash from joined username and date with secretKey
function hashstring(something, secretKey) {
	console.log(something, secretKey)
	return crypto.createHmac('md5', (Buffer.from(secretKey, 'ascii')))
		.update(something)
		.digest('base64')
		.replace('/', ',')
		.replace('+', '-')
}

//wrapper function to call other functions
function getSignature(username, secretKey) {
	return hashstring(joinNameAndDate(username, formatDate), secretKey)
}

console.log(getSignature("monkey", "oranguatng"))
