import * as React from "react";
import { Tooltip } from "./tooltip";

export interface LabelProps {
	for: string;
	text: string;
	class?: string[];
	tooltip?: string;
}

/** Helper component for a settings label */
export function Label(props: LabelProps) {
	const classNames = (props.class as string[] || []);

	return (
		<label htmlFor={props.for} className={classNames.join(" ")}>
			{_(props.text)}
			{props.tooltip != null && <Tooltip text={props.tooltip} />}
		</label>
	);
}
