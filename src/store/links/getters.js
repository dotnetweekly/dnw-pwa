import * as calendarHelper from "../../helpers/calendar";

const links = state => state.links;
const olderLinks = state => state.olderLinks;
const filter = state => state.filter;
const filterCategory = state =>
  state.filter && state.filter.category ? state.filter.category : "";
const filterCategories = state =>
  state.filter && state.filter.categories ? state.filter.categories : [];

const filterWeek = state =>
  state.filter && state.filter.dateWeek ? parseInt(state.filter.dateWeek) : "";
const filterYear = state =>
  state.filter && state.filter.dateYear ? parseInt(state.filter.dateYear) : "";

const linksLoading = state => state.linksLoading;

export {
  links,
  olderLinks,
  filter,
  filterCategory,
  filterCategories,
  filterYear,
  filterWeek,
  linksLoading
};
