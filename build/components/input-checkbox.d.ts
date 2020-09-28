import * as React from 'react';
export interface InputCheckboxProps {
    onChange: (newValue: boolean) => void;
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
     * The value of the input.
     */
    value: boolean;
    /**
     * Additional class names.
     * Default: `s12`
     */
    className?: string;
    /**
     * If the input element should be completeley disabled.
     */
    disabled?: boolean;
}
interface InputCheckboxState {
    id: string;
    value: boolean;
}
/**
 * A single checkbox input.
 */
export declare class InputCheckbox extends React.PureComponent<InputCheckboxProps, InputCheckboxState> {
    constructor(props: InputCheckboxProps);
    componentDidUpdate(prevProps: InputCheckboxProps): void;
    render(): JSX.Element;
    private handleChange;
}
export {};
