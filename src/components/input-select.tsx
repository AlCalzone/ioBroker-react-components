/*
 * React component to render a select input in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */

import * as React from 'react';

import { uuidv4 } from '../lib/helpers';

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
export class InputSelect<T extends string | string[]> extends React.PureComponent<InputSelectProps<T>, InputSelectState<T>> {
  private selectElement: HTMLSelectElement | null | undefined;

  private formSelect: M.FormSelect | null | undefined;

  constructor(props: InputSelectProps<T>) {
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

  public componentDidUpdate (prevProps: InputSelectProps<T>): void {
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
        <select id={this.state.id} value={this.state.value} onChange={this.handleChange} disabled={this.props.disabled} multiple={Array.isArray(this.props.value)} ref={me => this.selectElement = me}>
          {Object.keys(this.state.options).map((key) => {
            const attrs: React.OptionHTMLAttributes<HTMLOptionElement> = {};
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

    const value = (Array.isArray(this.props.value) ? this.formSelect.getSelectedValues() : event.target.value) as T;

    this.setState({
      value: value
    }, () => {
      this.props.onChange(this.state.value as any);
    });
  }
}