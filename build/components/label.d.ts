/// <reference types="react" />
export interface LabelProps {
    for: string;
    text: string;
    class?: string[];
    tooltip?: string;
}
/** Helper component for a settings label */
export declare function Label(props: LabelProps): JSX.Element;
