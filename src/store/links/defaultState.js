import * as calendarHelper from "../../helpers/calendar";
const date = Date.now();

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
    date: date,
    dateYear: calendarHelper.getWeek(new Date(date)),
    dateWeek: (new Date(date)).getFullYear(),
    calendar: {}
  }
};

export default defaultState;
