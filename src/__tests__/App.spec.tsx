import * as React from "react";
import { shallow } from "enzyme";

import App from "../App";

it("renders the heading", () => {
  const result = shallow(<App />).contains(<h1>Hello World</h1>);
  expect(result).toBeTruthy();
});