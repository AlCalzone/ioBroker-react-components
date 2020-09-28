/*
 * React component to render a select input in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */

import * as React from 'react';

import { uuidv4 } from '../lib/helpers';

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
export class InputSelect extends React.PureComponent<InputSelectProps, InputSelectState> {
  private selectElement: HTMLSelectElement | null | undefined;

  private formSelect: M.FormSelect | null | undefined;

  constructor(props: InputSelectProps) {
    super(props);

    let options: Record<string, string>;
    if (Array.isArray(this.props.options)) {
      options = {};
      this.props.options.forEach((o) => options[o] = o);
    } else {
      options = this.props.options;
    }

    this.state = {
      id: this.props.id || uuidv4(),
      value: this.props.value,
      options: options
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount (): void {
    if (this.selectElement) {
      this.formSelect = M.FormSelect.init(this.selectElement);
    }
  }

  public componentDidUpdate (prevProps: InputSelectProps): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      }, () => {
        if (this.selectElement) {
          this.formSelect = M.FormSelect.init(this.selectElement);
        }
      });
    }

    if (this.selectElement && (prevProps.disabled !== this.props.disabled || JSON.stringify(prevProps.disabledOptions) !== JSON.stringify(this.props.disabledOptions))) {
      this.formSelect = M.FormSelect.init(this.selectElement);
    }
  }

  public render(): JSX.Element {
    let className = 'input-field col s12';
    if (this.props.className) {
      className = 'input-field col ' + this.props.className;
    }
    return (
      <div className={className}>
        <select id={this.state.id} value={this.state.value} onChange={this.handleChange} disabled={this.props.disabled} multiple={this.props.multiple} ref={me => this.selectElement = me}>
          {Object.keys(this.state.options).map((key) => {
            const attrs: React.OptionHTMLAttributes<HTMLOptionElement> = {};
            /*if (Array.isArray(this.state.value)) {
              if (this.state.value.indexOf(key) > -1) {
                attrs.selected = true;
              }
            } else {
              if (key === this.state.value) {
                attrs.selected = true;
              }
            }*/
            if (this.props.disabledOptions && this.props.disabledOptions.indexOf(key) > -1) {
              attrs.disabled = true;
            }
            return <option key={key} value={key} {...attrs}>{this.state.options[key]}</option>;
          })}
        </select>
        <label htmlFor={this.state.id}>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }

  private handleChange (event: React.ChangeEvent<HTMLSelectElement>): void {
    if (!this.formSelect) return;

    const value = this.props.multiple ? this.formSelect.getSelectedValues() : event.target.value;

    this.setState({
      value: value
    }, () => {
      this.props.onChange(this.state.value);
    });
  }
}