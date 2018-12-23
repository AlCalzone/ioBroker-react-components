// Renders some components in jQuery UI tabs
import * as React from "react";

interface TabsProps {
	id?: string;
	labels: string[];
	children: React.ReactNode[];
	tabSize?: number;
}

export class Tabs extends React.Component<TabsProps> {

	private static defaultProps = {
		id: "tabs",
		tabSize: 3,
	};

	constructor(props: TabsProps) {
		super(props);
	}

	public render() {
		return (
			<div className="row" id={this.props.id}>
				<div className="tabs-header col s12">
					<ul className="tabs">
						{this.props.labels.map(
							(k, i) => <li className={`tab col s${this.props.tabSize}`} key={i}><a href={`#${this.props.id}-${i}`}>{_(k)}</a></li>,
						)}
					</ul>
				</div>
				{React.Children.map(this.props.children, (child, i) => (
					<div className="col s12" key={i} id={`${this.props.id}-${i}`}>
						{child}
					</div>
				))}
			</div>
		);
	}
}
