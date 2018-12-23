// React component test
import * as React from "react";

// tslint:disable:no-unused-expression
import { assert, expect } from "chai";
import { shallow } from "enzyme";
import * as sinon from "sinon";

// import components
import { Label } from "./label";

describe("Label", () => {

	it(`renders a <label>`, () => {
		expect(shallow(<Label for="foo" text="bar" />).find("label")).to.have.length(1);
	});

});
