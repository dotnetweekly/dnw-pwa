import * as errorHelper from "../../helpers/errors";

describe('calendar.test.js', () => {
  it("returns correct month name", () => {
    errorHelper.errors = [{ field: "name" }]
    expect(errorHelper.hasError("name")).toEqual(true)
  })
  it("returns correct day name", () => {
    errorHelper.errors = [{ field: "name", error: "Name is required" }]
    expect(errorHelper.getError("name")).toEqual("Name is required")
  })
})
