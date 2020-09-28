/*
 * React component to render a button in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */

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
export class Button extends React.PureComponent<ButtonProps> {
  constructor (props: ButtonProps) {
    super(props);
  }

  render (): JSX.Element {
    let className = `btn-floating btn-${this.props.size || 'small'} waves-effect waves-light blue`;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <a className={className} title={this.props.title} onClick={this.props.onClick}>
        <i className='material-icons'>{this.props.iconName}</i>
      </a>
    );
  }
}