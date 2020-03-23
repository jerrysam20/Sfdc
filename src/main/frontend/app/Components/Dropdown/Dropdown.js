import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Dropdown.css';

export default class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({
        value: newProps.value
      });
    }
  }
  render() {
    const selectedOption = this.props.options.filter(
      item => item.value === this.state.value
    );
    return (
      <Select
        options={this.props.options}
        placeholder={this.state.value}
        value={selectedOption === [] ? {} : selectedOption}
        onChange={this.props.onChange}
      />
    );
  }
}

DropdownComponent.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string
};
DropdownComponent.defaultProps = {
  options: [],
  onChange: () => {},
  value: ''
};
