import { shallow } from 'vue-test-utils'
import * as calendarHelper from "../../helpers/calendar";

describe('calendar.test.js', () => {
  it("returns correct month name", () => {
    expect(calendarHelper.getMonthName(2)).toEqual("March")
  })
  it("returns correct day name", () => {
    expect(calendarHelper.getDayName(4)).toEqual("Friday")
  })
  it("returns correct week", () => {
    expect(calendarHelper.getWeek("2018-01-11")).toEqual(2)
    expect(calendarHelper.getWeek("2017-12-31")).toEqual(52)
  })
  it("returns correct February Days", () => {
    expect(calendarHelper.getFebruaryDays("2018-02-01 00:00:00")).toEqual(28)
    expect(calendarHelper.getFebruaryDays("2016-02-04")).toEqual(29)
  })
  it("returns correct calendar", () => {
    const calendar = calendarHelper.getCalendar("2017-12-15 00:00:00");
    expect(calendar.weeks[0].days[0]).toEqual({"date": new Date("2017-11-27T08:00:00.000Z"), "inPast": true, "week": 48})
    expect(calendar.weeks[4].days[6]).toEqual({"date": new Date("2017-12-31T08:00:00.000Z"), "week": 52})

    const calendar2 = calendarHelper.getCalendar("2016-10-30 00:00:00");
    expect(calendar2.weeks[0].days[0]).toEqual({"date": new Date("2016-09-26T07:00:00.000Z"), "inPast": true, "week": 39})
    expect(calendar2.weeks[5].days[6]).toEqual({"date": new Date("2016-11-06T07:00:00.000Z"), "inFuture": true, "week": 44})
  })
})
