import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {EuiFieldText, EuiFormRow, EuiSwitch} from '@elastic/eui';

export const KerfInput = (props) => {
  const [useKerf, setUseKerf] = useState(false);
  const {
    onChange
  } = props;

  return (
    <EuiFormRow
      label="Kerf"
      helpText="Use dot as decimal separator"
    >
      <div>
        <EuiSwitch
          label="Set kerf value"
          name="useKerf"
          checked={useKerf}
          onChange={() => setUseKerf(!useKerf)}
        />
        {useKerf && (
          <EuiFieldText
            style={{marginTop: 5}}
            name="kerf"
            type="number"
            placeholder="Kerf value in millimeter"
            onChange={event => onChange(parseFloat(event.target.value))}
          />
        )}
      </div>
    </EuiFormRow>
  )
};

KerfInput.propTypes = {
  onChange: PropTypes.func
};
