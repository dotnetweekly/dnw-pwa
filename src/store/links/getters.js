import * as calendarHelper from '../../helpers/calendar';

const links = (state) => state.links;
const filterDate = (state) => state.filter.date;
const filterCalendar = (state) =>
	state.filter && state.filter.date ? calendarHelper.getCalendar(state.filter.date) : [];
const filterDateYear = (state) => (state.filter && state.filter.date ? new Date(state.filter.date).getFullYear() : '');
const filterDateWeek = (state) => (state.filter && state.filter.date ? calendarHelper.getWeek(state.filter.date) : '');
const filterCategory = (state) => state.filter && state.filter.category;

export { links, filterDate, filterCalendar, filterDateYear, filterDateWeek, filterCategory };
