import * as calendarHelper from '../../helpers/calendar';

const links = (state) => state.links;
const categoryId = (state) => state.categoryId;
const filterDate = (state) => state.filter.date;
const filterCalendar = (state) =>
	state.filter && state.filter.date ? calendarHelper.getCalendar(state.filter.date) : [];

export { links, categoryId, filterDate, filterCalendar };
