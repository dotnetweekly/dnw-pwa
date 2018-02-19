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

const getMonthName = function(number) {
	return monthNames[number];
};

const getDayName = function(number) {
	return dayNames[number];
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

const getDateRangeOfWeek = function(week, year) {
	var date = new Date(year, 0, 1);
  date.setDate((week * 7));
	const dateRange = {
		from: new Date(date.setDate(date.getDate() - 6)),
		to: new Date(date.setDate(date.getDate() + 6))
  };
  return dateRange;
};

const getFebruaryDays = function(dateValue) {
  const date = new Date(dateValue);
	if (date.getMonth() == 1) {
		if ((date.getFullYear() % 100 != 0 && date.getFullYear() % 4 == 0) || date.getFullYear() % 400 == 0) {
			return 29;
		} else {
			return 28;
		}
	}
};

const getCalendar = function(date) {
	const today = Date.now();
	const dateNow = new Date(date);
	const dayPerMonth = monthDays;
	dayPerMonth[1] = getFebruaryDays(dateNow);

	let counter = 1;
	const month = dateNow.getMonth();
  const year = dateNow.getFullYear();
  let firstDay = new Date(year, month, counter);

	let weekdays = firstDay.getDay() - 1;
  let weekdays2 = weekdays === -1 ? 0 : weekdays;

	const numOfDays = dayPerMonth[month];
	let lastDayCounted = dateNow;

	const weeks = [];
	let week = [];

	if (weekdays === -1) {
		weekdays = 6;
  }

	while (weekdays > 0) {
		firstDay.setDate(firstDay.getDate() - 1);
		week.push({
			date: new Date(firstDay),
			week: getWeek(firstDay),
			inPast: true
		});

		weekdays--;
	}

	week.reverse();

	weekdays2 = week.length;

	while (counter <= numOfDays) {
		if (weekdays2 > 6) {
			weekdays2 = 0;
			weeks.push({
				days: week,
				week: getWeek(week[0].date),
				year: week[0].date.getFullYear()
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

	lastDayCounted.setDate(lastDayCounted.getDate() + 1);
	let lastDay = new Date(lastDayCounted);
	const daysRemaining = 7 - week.length - 1;

	for (var i = 0; i <= daysRemaining; i++) {
		week.push({
			date: new Date(lastDay),
			week: getWeek(lastDay),
			inFuture: true
		});
		lastDay.setDate(lastDay.getDate() + 1);
	}

	weeks.push({
		days: week,
		week: getWeek(week[0].date),
		year: week[0].date.getFullYear(),
		inFuture: true
  });

	return {
		weeks,
		month,
		firstDay,
		lastDay
	};
};

export { getWeek, getDateRangeOfWeek, getMonthName, getFebruaryDays, getCalendar, getDayName };
