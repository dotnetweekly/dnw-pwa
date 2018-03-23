import { shallow } from "vue-test-utils";
import AppFooter from "../AppFooter.vue";

describe("AppFooter.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = shallow(AppFooter, {});
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
