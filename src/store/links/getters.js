import * as calendarHelper from "../../helpers/calendar";

const links = state => state.links;
const olderLinks = state => state.olderLinks;
const filter = state => state.filter;
const filterDate = state => state.filter.date;
const filterCalendar = function(state) {
  if (state.filter && state.filter.date) {
    return calendarHelper.getCalendar(state.filter.date)
  }
  return [];
}
const filterCategory = state =>
  state.filter && state.filter.category ? state.filter.category : "";
const filterCategories = state =>
  state.filter && state.filter.categories ? state.filter.categories : [];

export {
  links,
  olderLinks,
  filter,
  filterDate,
  filterCalendar,
  filterCategory,
  filterCategories
};
