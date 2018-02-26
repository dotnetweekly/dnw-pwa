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

const serverWeek = state =>
  state.filter && state.filter.serverWeek ? parseInt(state.filter.serverWeek) : "";
const serverYear = state =>
  state.filter && state.filter.serverYear ? parseInt(state.filter.serverYear) : "";
const serverMonth = state =>
  state.filter && state.filter.serverMonth ? parseInt(state.filter.serverMonth) : "";
const serverDate = state =>
  state.filter && state.filter.serverDate ? parseInt(state.filter.serverDate) : "";

const linksAreLoading = state => state.linksAreLoading;
const firstLoad = state => state.firstLoad;

export {
  links,
  olderLinks,
  filter,
  filterCategory,
  filterCategories,
  filterYear,
  filterWeek,
  linksAreLoading,
  firstLoad,
  serverWeek,
  serverYear,
  serverMonth,
  serverDate
};
