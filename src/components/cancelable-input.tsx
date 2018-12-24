import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CancelableInputState {
	editing: boolean;
	text: string;
}
export interface CancelableInputProps {
	text: string;
	maxLength?: number;
	textChanged: (newText: string) => void;
}

export class CancelableInput extends React.Component<CancelableInputProps, CancelableInputState> {

	constructor(props: CancelableInputProps) {
		super(props);
		this.state = {
			editing: false,
			text: props.text,
		};
	}

	private txtEdit: HTMLInputElement | null | undefined;

	private readonly beginEdit = () => {
		this.selectPending = true;
		this.setState({ editing: true });
	}
	private readonly onEdit = () => {
		this.setState({
			text: this.txtEdit!.value,
		});
	}
	private readonly endEdit = (save: boolean = true) => {
		this.setState({
			editing: false,
		});
		this.selectPending = false;
		if (save) {
			if (this.state.text !== this.props.text) this.props.textChanged(this.state.text);
			this.txtEdit!.blur();
		} else {
			this.setState({ text: this.props.text }, () => this.txtEdit!.blur());
		}
	}

	private readonly keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 13 /* Enter */) {
			this.endEdit();
		} else if (e.keyCode === 27 /* Escape */) {
			this.endEdit(false);
		}
	}

	private selectPending: boolean = false;

	public render() {
		return (
			<input
				type="text"
				ref={(me) => {
					this.txtEdit = me;
					if (this.txtEdit != null && this.selectPending) {
						this.txtEdit.select();
						this.selectPending = false;
					}
				}}
				onBlur={() => this.endEdit()}
				onKeyDown={this.keyDown}
				onChange={this.onEdit}
				onFocus={this.beginEdit}
				value={this.state.text}
				maxLength={this.props.maxLength || 200}
			/>
		);
	}

}
