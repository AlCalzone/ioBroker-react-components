import * as React from "react";
interface TabsProps {
    id?: string;
    labels: string[];
    children: React.ReactNode[];
    tabSize?: number;
}
export declare class Tabs extends React.Component<TabsProps> {
    private static defaultProps;
    constructor(props: TabsProps);
    render(): JSX.Element;
}
export {};
