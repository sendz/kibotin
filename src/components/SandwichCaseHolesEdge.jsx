import React from 'react';
import {EuiFieldText, EuiFormRow} from '@elastic/eui';
import * as PropTypes from 'prop-types';

export const SandwichCaseHolesEdge = (props) => {
  const {
    onChange
  } = props;
  return (
    <React.Fragment>
      <EuiFormRow
        label="Mount Holes Edge"
      >
        <EuiFieldText
          style={{marginTop: 5}}
          name="mount-holes-edge"
          type="text"
          placeholder="Padding between mount holes and edge in mm"
          onChange={event => onChange(parseFloat(event.target.value))}
        />
      </EuiFormRow>
    </React.Fragment>
  )
};

SandwichCaseHolesEdge.propTypes = {
  onChange: PropTypes.func
};
