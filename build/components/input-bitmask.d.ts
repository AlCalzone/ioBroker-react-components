import * as React from 'react';
export interface InputBitmaskProps {
    onChange: (newValue: number) => void;
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
     * Number of bits in this bitmask.
     */
    bits: number;
    /**
     * The value of the bitmask.
     */
    value: number;
    /**
     * Additional class names.
     * Default: `s12`
     */
    className?: string;
}
interface InputBitmaskState {
    id: string;
    value: number;
    bits: boolean[];
}
/**
 * Checkbox inputs for a bitmask.
 */
export declare class InputBitmask extends React.PureComponent<InputBitmaskProps, InputBitmaskState> {
    constructor(props: InputBitmaskProps);
    componentDidUpdate(prevProps: InputBitmaskProps): void;
    render(): JSX.Element;
    private changeBit;
}
export {};
