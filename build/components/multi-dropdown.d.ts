import * as React from "react";
export interface MultiDropdownProps {
    options: {
        [key: string]: string;
    };
    checkedOptions?: string[];
    checkedChanged: (selected: string[]) => void;
}
export declare class MultiDropdown extends React.Component<MultiDropdownProps> {
    private static defaultProps;
    constructor(props: MultiDropdownProps);
    private dropdown;
    private mcssSelect;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private readStateFromUI;
    render(): JSX.Element;
}
