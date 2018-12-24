import * as React from "react";
import * as ReactDOM from "react-dom";
import { CancelableInput } from "./components/cancelable-input";
import { Label } from "./components/label";
import { MultiDropdown } from "./components/multi-dropdown";

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
		</ErrorBoundary>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementsByTagName("main")[0],
);
