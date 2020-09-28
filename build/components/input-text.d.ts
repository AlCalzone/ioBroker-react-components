import * as React from 'react';
export interface InputTextProps {
    onChange: (newValue: string) => void;
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
    value: string;
    /**
     * Additional class names.
     * Default: `s12`
     */
    className?: string;
    /**
     * If the input element should be completeley disabled.
     */
    disabled?: boolean;
    /**
     * Maximum length for the text.
     */
    maxLength?: number;
    /**
     * Error message to display in case of e.g. validation errors.
     * The error message will have the css class `error-msg` and may be styled on your own.
     */
    errorMsg?: string | null;
    /**
     * Optional transforming of input.
     */
    transform?: 'lowerCase' | 'upperCase' | ((newValue: string, oldValue: string) => string);
}
interface InputTextState {
    id: string;
    value: string;
}
/**
 * A text input.
 */
export declare class InputText extends React.PureComponent<InputTextProps, InputTextState> {
    constructor(props: InputTextProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: InputTextProps): void;
    render(): JSX.Element;
    private handleChange;
}
export {};
