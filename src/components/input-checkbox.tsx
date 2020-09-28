/*
 * React component to render a checkbox in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */

import * as React from 'react';

import { uuidv4 } from '../lib/helpers';

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
export class InputCheckbox extends React.PureComponent<InputCheckboxProps, InputCheckboxState> {

  constructor(props: InputCheckboxProps) {
    super(props);

    this.state = {
      id: this.props.id || uuidv4(),
      value: this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidUpdate (prevProps: InputCheckboxProps): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  public render(): JSX.Element {
    let className = 'input-field-checkbox col s12';
    if (this.props.className) {
      className = 'input-field-checkbox col ' + this.props.className;
    }
    return (
      <div className={className}>
        <label>
          <input type='checkbox' id={this.state.id} checked={this.state.value} onChange={this.handleChange} disabled={this.props.disabled} />
          <span>{this.props.label}</span>
        </label>
        {this.props.children && <>
          <br />
          {this.props.children}
        </>}
      </div>
    );
  }

  private handleChange (): void {
    this.setState({
      value: !this.state.value
    }, () => {
      this.props.onChange(this.state.value);
    });
  }
}