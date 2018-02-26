import * as calendarHelper from "../../helpers/calendar";

const defaultState = {
  firstLoad: true,
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
    dateYear: "",
    dateWeek: "",
    serverYear: "",
    serverWeek: "",
    serverMonth: "",
    serverDate: "",
    linksLoading: false
  }
};

export default defaultState;
