import * as React from "react";

export interface TooltipProps {
	text: string;
}

/** Helper component for a tooltip */
export function Tooltip(props: TooltipProps) {
	return <i className="material-icons" title={_(props.text)}>live_help</i>;
}
