import * as React from "react";
import * as ReactDOM from "react-dom";
import { CancelableInput } from "./components/cancelable-input";
import { Label } from "./components/label";
import { MultiDropdown } from "./components/multi-dropdown";

import { Button } from "./components/button";
import { InputText } from "./components/input-text";
import { InputCheckbox } from "./components/input-checkbox";
import { InputBitmask } from "./components/input-bitmask";
import { InputSelect } from "./components/input-select";

// Translate polyfill
(window as any)._ = (text: string) => text;

interface ErrorBoundaryState {
	error: any;
	errorInfo: any;
}

// tslint:disable-next-line:no-empty-interface
interface ErrorBoundaryProps {
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	public componentDidCatch(error: any, errorInfo: any) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	public render() {
		if (this.state.errorInfo) {
			return (
				<div>
					<h2>Something went wrong.</h2>
					<details style={{ whiteSpace: "pre-wrap" }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

interface InputTestProps {}
interface InputTestState {
	textError: string | null;
	disable: boolean;
}
class InputTest extends React.Component<InputTestProps, InputTestState> {

	constructor (props: InputTestProps) {
		super(props);

		this.state = {
			textError: null,
			disable: false
		};
	}

	render () {
		return (<>
			<div className="row">
				<InputText
					label="InputText"
					className="s6 m3"
					value="test"
					onChange={console.log}
				>
					<span>Some description...</span>
				</InputText>
				<InputText
					label="InputText Upper"
					className="s6 m3"
					value=""
					onChange={console.log}
					transform="upperCase"
					disabled={this.state.disable}
				>
					<span>All input will be upper case</span>
				</InputText>
				<InputText
					label="Only hex numbers"
					className="s6 m3"
					value=""
					onChange={(v) => this.setState({textError: v.match(/^[0-9a-f]*$/) ? null : 'Must be a hex number' })}
					transform="lowerCase"
					errorMsg={this.state.textError}
					disabled={this.state.disable}
				>
					<span>Allow only hex numbers</span>
				</InputText>
			</div>

			<div className="row">
				<InputCheckbox
					label="Disable texts"
					className="s6 m3"
					value={this.state.disable}
					onChange={(v) => this.setState({ disable: v })}
				>
					<span>Check this to disable some text inputs</span>
				</InputCheckbox>

				<InputBitmask
					label="Bitmask"
					className="s6 m9"
					bits={8}
					value={5}
					onChange={console.log}
				>
					<span>Select the bits...</span>
				</InputBitmask>
			</div>

			<div className="row">
				<InputSelect
					label="Select"
					className="s6 m3"
					options={{
						a: "A",
						b: "B",
						c: "C"
					}}
					onChange={console.log}
					value="a"
					disabledOptions={["c"]}
				/>
				<InputSelect
					label="Select"
					className="s6 m3"
					options={["0", "1", "2", "3", "4", "5"]}
					disabledOptions={["4", "5"]}
					onChange={console.log}
					value=""
				/>
				<InputSelect
					label="Multiselect"
					className="s6 m3"
					options={["0", "1", "2", "3", "4", "5", "6", "7"]}
					disabledOptions={["5"]}
					onChange={console.log}
					multiple={true}
					value={["1", "2"]}
				/>
			</div>

			<div className="row">
				<Button iconName="info" title="Testbutton" onClick={() => alert('button clicked')} />
				<Button iconName="help" title="Testbutton" size="medium" onClick={() => alert('button clicked')} />
				<Button iconName="add" title="Testbutton" size="large" onClick={() => alert('button clicked')} />
			</div>
		</>);
	}
}

function Root() {
	return (
		<ErrorBoundary>
			<div className="row">
				<div className="col c4">
					<h1>Label and input</h1>
					<Label for="foo" text="bar" tooltip="Hallo!" />
					<input type="text" id="foo" />
				</div>

				<div className="col c4">
					<h1>Multi-Dropdown</h1>
					<MultiDropdown
						options={{
							"Option 1": "Wert 1",
							"Option 2": "Wert 2",
						}}
						checkedChanged={(selected) => console.log(`selected options: ${selected}`)}
						checkedOptions={["Option 2"]}
					/><br />
					<MultiDropdown
						options={{
							"Option 3": "Wert 3",
							"Option 4": "Wert 4",
						}}
						checkedChanged={(selected) => console.log(`selected options: ${selected}`)}
						checkedOptions={["Option 4"]}
					/>

				</div>

				<div className="col c4">
					<h1>Cancelable input</h1>
					<CancelableInput text="Default text" maxLength={15} textChanged={console.log} />
				</div>
			</div>

			<hr />

			<InputTest />
		</ErrorBoundary>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementsByTagName("main")[0],
);
