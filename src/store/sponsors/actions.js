const actions = {
  setType({ state }, category) {
    state.sponsorLink.category = category;
    if (category == "job-listing") {
      state.sponsorLink.imageUrl = "";
    }
  },
  setFilter({ state }, filter) {
    state.sponsorFilter = filter;
    state.sponsorLink.date = filter.nextWeeks[1].tuesday;
  },
  setFilterDate({ state }, date) {
    state.sponsorLink.date = date;
  }
};

export default actions;
