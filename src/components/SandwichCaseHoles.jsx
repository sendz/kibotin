import React from 'react';
import {EuiFieldText, EuiFormRow} from '@elastic/eui';
import * as PropTypes from 'prop-types';

export const SandwichCaseHoles = (props) => {
  const {
    onChange
  } = props;
  return (
    <React.Fragment>
      <EuiFormRow
        label="Mount Holes Number"
      >
        <EuiFieldText
          style={{marginTop: 5}}
          name="mount-holes"
          type="text"
          placeholder="Amount of Mount Holes Number"
          onChange={event => onChange(parseInt(event.target.value, 10))}
        />
      </EuiFormRow>
    </React.Fragment>
  )
};

SandwichCaseHoles.propTypes = {
  onChange: PropTypes.func
};
