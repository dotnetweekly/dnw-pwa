import * as calendarHelper from "../../helpers/calendar";
let now = new Date(Date.now());
now.setHours(0,0,0,0);

const defaultState = {
  links: [],
  olderLinks: [],
  filter: {
    categories: [
      { label: "All", value: "" },
      { label: "Articles", value: "articles" },
      { label: "Books", value: "books" },
      { label: "Events/ Training", value: "events-training" },
      { label: "Libraries/ Tools", value: "libraries-tools" },
      { label: "Videos", value: "videos" }
    ],
    category: "",
    date: now,
    dateYear: "",
    dateWeek: "",
    calendar: {}
  }
};

export default defaultState;
