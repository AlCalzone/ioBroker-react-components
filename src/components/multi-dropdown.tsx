// Renders some components in jQuery UI tabs
import * as React from "react";

// tslint:disable-next-line:variable-name
const M_Select = (M.FormSelect || (M as any).Select as typeof M.FormSelect);

export interface MultiDropdownProps {
	options: { [key: string]: string };
	checkedOptions?: string[];
	checkedChanged: (selected: string[]) => void;
}

export class MultiDropdown extends React.Component<MultiDropdownProps> {

	private static defaultProps = {
		checkedOptions: [] as string[],
	};

	constructor(props: MultiDropdownProps) {
		super(props);
		this.readStateFromUI = this.readStateFromUI.bind(this);
	}

	private dropdown: HTMLSelectElement | null | undefined;
	private mcssSelect: M.FormSelect | null | undefined;

	public componentDidMount() {
		if (this.dropdown != null) {
			$(this.dropdown).on("change", this.readStateFromUI);

			this.mcssSelect = M_Select.getInstance(this.dropdown) || new M_Select(this.dropdown);
		}
	}

	public componentWillUnmount() {
		if (this.dropdown != null) {
			$(this.dropdown).off("change", this.readStateFromUI);
		}
	}

	private readStateFromUI() {
		if (!this.mcssSelect) return;
		// update the adapter settings
		this.props.checkedChanged(this.mcssSelect.getSelectedValues());
	}

	public render() {
		return (
			<select
				multiple={true}
				ref={me => this.dropdown = me}
				defaultValue={this.props.checkedOptions}
			>
				<option value="" disabled>{_("select devices")}</option>
				{Object.keys(this.props.options).map(k => (
					<option key={k} value={k}>
						{this.props.options[k]}
					</option>
				))}
			</select>
		);
	}
}
