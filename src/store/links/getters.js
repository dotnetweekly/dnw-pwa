import * as calendarHelper from '../../helpers/calendar';

const links = (state) => state.links;
const filter = (state) => state.filter;
const filterDate = (state) => state.filter.date;
const filterCalendar = (state) =>
	state.filter && state.filter.date ? calendarHelper.getCalendar(state.filter.date) : [];
const filterCategory = (state) => (state.filter && state.filter.category ? state.filter.category : '');
const filterCategories = (state) => (state.filter && state.filter.categories ? state.filter.categories : []);

export { links, filter, filterDate, filterCalendar, filterCategory, filterCategories };
