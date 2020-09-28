import * as React from 'react';
export interface ButtonProps {
    /**
     * Handler for clicks on the button.
     */
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    /**
     * Name of the icon to show on the button.
     */
    iconName: string;
    /**
     * Size of the button. Default is `small`.
     */
    size?: 'tiny' | 'small' | 'medium' | 'large';
    /**
     * Additional class names.
     */
    className?: string;
    /**
     * Optional title for the button.
     */
    title?: string;
}
/**
 * Renders a floating matrializecss button.
 */
export declare class Button extends React.PureComponent<ButtonProps> {
    constructor(props: ButtonProps);
    render(): JSX.Element;
}
