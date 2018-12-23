import * as React from "react";
import * as ReactDOM from "react-dom";
import { Label } from "./components/label";

// Translate polyfill
(window as any)._ = (text: string) => text;

function Root() {
	return (
		<>
			<div className="row">
				<div className="col c4">
					<h1>Label and input</h1>
					<Label for="foo" text="bar" tooltip="Hallo!" />
					<input type="text" id="foo" />
				</div>
			</div>
		</>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementsByTagName("main")[0],
);
