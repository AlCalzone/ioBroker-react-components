import * as React from 'react';
export interface InputSelectProps<T extends string | string[]> {
    onChange: (newValue: T extends string ? string : string[]) => void;
    /**
     * Unique ID for this element.
     * If not set a UUID will be generated.
     */
    id?: string;
    /**
     * Label for this input.
     * Will be translatable.
     */
    label: string | JSX.Element;
    /**
     * The selected value of the input.
     * A string for a single select or an array of strings for a multi select.
     */
    value: T;
    /**
     * Additional class names.
     * Default: `s12`
     */
    className?: string;
    /**
     * The options to select.
     * `key` -> `display value`
     */
    options: Record<string, string> | string[];
    /**
     * Array of options which should be disabled.
     */
    disabledOptions?: string[];
    /**
     * If the input element should be completeley disabled.
     */
    disabled?: boolean;
}
interface InputSelectState<T extends string | string[]> {
    id: string;
    value: T;
    options: Record<string, string>;
}
/**
 * A select input.
 */
export declare class InputSelect<T extends string | string[]> extends React.PureComponent<InputSelectProps<T>, InputSelectState<T>> {
    private selectElement;
    private formSelect;
    constructor(props: InputSelectProps<T>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: InputSelectProps<T>): void;
    render(): JSX.Element;
    private handleChange;
}
export {};
