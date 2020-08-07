import React from 'react';
import {EuiFieldText, EuiFormRow} from '@elastic/eui';
import * as PropTypes from 'prop-types';

export const SandwichCaseHolesSize = (props) => {
  const {
    onChange
  } = props;
  return (
    <React.Fragment>
      <EuiFormRow
        label="Mount Holes Size"
      >
        <EuiFieldText
          style={{marginTop: 5}}
          name="mount-holes-size"
          type="text"
          placeholder="Size of Mount Holes in mm"
          onChange={event => onChange(parseFloat(event.target.value))}
        />
      </EuiFormRow>
    </React.Fragment>
  )
};

SandwichCaseHolesSize.propTypes = {
  onChange: PropTypes.func
};
