import * as React from 'react';
export interface InputSelectProps {
    onChange: (newValue: string | string[]) => void;
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
     * Must be a string if `multiple` is false and an array of strings if `multiple` is true.
     */
    value: string | string[];
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
     * Allow multiple options to be selected.
     */
    multiple?: boolean;
    /**
     * If the input element should be completeley disabled.
     */
    disabled?: boolean;
}
interface InputSelectState {
    id: string;
    value: string | string[];
    options: Record<string, string>;
}
/**
 * A select input.
 */
export declare class InputSelect extends React.PureComponent<InputSelectProps, InputSelectState> {
    private selectElement;
    private formSelect;
    constructor(props: InputSelectProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: InputSelectProps): void;
    render(): JSX.Element;
    private handleChange;
}
export {};
