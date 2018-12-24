import * as React from "react";
export interface MultiDropdownProps {
    options: {
        [key: string]: string;
    };
    checkedOptions?: string[];
    checkedChanged: (selected: string[]) => void;
}
export interface MultiDropdownState {
    checkedOptions: string[];
}
export declare class MultiDropdown extends React.Component<MultiDropdownProps, MultiDropdownState> {
    private static defaultProps;
    constructor(props: MultiDropdownProps);
    private dropdown;
    private mcssSelect;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    private updateUI;
    private readStateFromUI;
    render(): JSX.Element;
}
