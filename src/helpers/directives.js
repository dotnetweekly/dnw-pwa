import Vue from 'vue';
import * as calendarHelper from './calendar';

Vue.filter('formatDate', function(value) {
	const date = new Date(value);
	if (value) {
		return `${calendarHelper.getDayName(date.getDay())}, ${date.getFullYear()}-${date.getMonth() +
			1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
	}
});

export default {};
