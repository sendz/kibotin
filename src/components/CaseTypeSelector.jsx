import React from 'react';
import * as PropTypes from 'prop-types';
import {CASE_TYPE} from '../constants/CASE_TYPE';
import {EuiFormRow, EuiSelect} from '@elastic/eui';

const caseOptions = Object.keys(CASE_TYPE).map(type => CASE_TYPE[type]);

export const CaseTypeSelector = (props) => {
  const {
    caseType,
    onChange
  } = props;

  return (
    <EuiFormRow
      label="Case Type"
    >
      <EuiSelect
        name="stabType"
        options={caseOptions}
        value={caseType}
        onChange={(event) => onChange(event.target.value, 10)}
      />
    </EuiFormRow>
  )
};

CaseTypeSelector.propTypes = {
  caseType: PropTypes.string,
  onChange: PropTypes.func
};
