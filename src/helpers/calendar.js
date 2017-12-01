const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const dayNames = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
const monthDays = [ '31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31' ];

const isISO = function(dateValue) {
	const date = new Date(dateValue);
	let checkDate = date.setDate(date.getDate() - date.getDay());
	checkDate = new Date(checkDate);
	return checkDate.getDay();
};

const getMonthName = function(number) {
	return monthNames[number];
};

const getWeek = function(dateValue) {
	const target = new Date(dateValue);
	const dayNr = (target.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNr + 3);
	const firstThursday = target.valueOf();
	target.setMonth(0, 1);
	if (target.getDay() != 4) {
		target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
	}
	return 1 + Math.ceil((firstThursday - target) / 604800000);
};

const getDateRangeOfWeek = function(dateValue) {
	const date = new Date(dateValue);
	const from = new Date(date.setDate(date.getDate() - date.getDay() + (isISO(date) ? 1 : 0)));
	return {
		from,
		to: new Date(from.setDate(from.getDate() + 7))
	};
};

const getFebruaryDays = function(dateValue) {
	const date = new Date(dateValue);
	if (date.getMonth() == 1) {
		if ((date.getYear() % 100 != 0 && date.getYear() % 4 == 0) || date.getYear() % 400 == 0) {
			return 29;
		} else {
			return 28;
		}
	}
};

const getCalendar = function(date) {
	const dateNow = new Date(date);
	const dayPerMonth = monthDays;
	dayPerMonth[1] = getFebruaryDays(dateNow);

	let counter = 1;
	const month = dateNow.getMonth();
	let nextMonth = month + 1;
	let day = dateNow.getDate();
	let year = dateNow.getFullYear();
	let nextDate = new Date(nextMonth + ' 1 ,' + year);
	let weekdays = nextDate.getDay() + (isISO(nextDate) ? 0 : -1);
	let weekdays2 = weekdays;
	let numOfDays = dayPerMonth[month];
	let lastDayCounted = dateNow;

	const weeks = [];
	let week = [];
	const firstDay = new Date(year, month, counter);

	while (weekdays > 0) {
		firstDay.setDate(firstDay.getDate() - 1);
		week.push({
			date: new Date(firstDay),
			week: getWeek(firstDay)
		});
		weekdays--;
	}

	week.reverse();

	while (counter <= numOfDays) {
		if (weekdays2 > 6) {
			weekdays2 = 0;
			weeks.push({
				days: week,
				week: getWeek(week[0].date)
			});
			week = [];
		}

		const newDay = new Date(year, month, counter);
		week.push({
			date: newDay,
			week: getWeek(newDay)
		});

		lastDayCounted = new Date(newDay);

		weekdays2++;
		counter++;
	}

	let lastDay = new Date(lastDayCounted);
	const daysRemaining = 7 - week.length;

	for (var i = 0; i <= daysRemaining; i++) {
		week.push({
			date: new Date(lastDay),
			week: getWeek(lastDay)
		});
		lastDay.setDate(lastDay.getDate() + 1);
	}

	weeks.push({
		days: week,
		week: getWeek(week[0].date)
	});

	return {
		weeks,
		month,
		year
	};
};

export { getWeek, getDateRangeOfWeek, getMonthName, getFebruaryDays, getCalendar };
