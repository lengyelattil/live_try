/**
 * @file Tab that shows the safety settings and allows the user to edit them.
 */

import mapValues from 'lodash-es/mapValues';
import { TextField } from 'mui-rff';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

import {
  createValidator,
  isEmpty,
  optional,
  positive,
} from '~/utils/validation';

import { getSafetySettings } from './selectors';
import { updateSafetySettings } from './slice';

const toNullOrNumber = (value) => (isEmpty(value) ? null : Number(value));

const validator = createValidator({
  criticalBatteryVoltage: optional(positive),
  lowBatteryVoltage: optional(positive),
  returnToHomeAltitude: optional(positive),
  returnToHomeSpeed: optional(positive),
});

const fields = [
  {
    id: 'criticalBatteryVoltage',
    label: 'safetySettingsTab.criticalBatteryVoltage',
    unit: 'V',
    description: 'safetySettingsTab.criticalBatteryVoltageDescript',
  },
  {
    id: 'lowBatteryVoltage',
    label: 'safetySettingsTab.lowBatteryVoltage',
    unit: 'V',
    description: 'safetySettingsTab.lowBatteryVoltageDescript',
  },
  {
    id: 'returnToHomeAltitude',
    label: 'safetySettingsTab.returnToHomeAltitude',
    unit: 'm',
    description: 'safetySettingsTab.returnToHomeAltitudeDescript',
  },
  {
    id: 'returnToHomeSpeed',
    label: 'safetySettingsTab.returnToHomeSpeed',
    unit: 'm/s',
    description: 'safetySettingsTab.returnToHomeSpeedDescript',
  },
];

const SafetySettingsFormPresentation = ({ initialValues, onSubmit, t }) => (
  <Form initialValues={initialValues} validate={validator} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <form id='safetySettings' onSubmit={handleSubmit}>
        <DialogContentText id='alert-dialog-description'>
          {t('safetySettingsTab.emptyValues')}
        </DialogContentText>
        {fields.map(({ id, label, unit, description }) => (
          <Box key={id} mt={1}>
            <TextField
              name={id}
              label={t(label)}
              // Not `number`, because that would make distinguishing whether
              // a field is empty or contains invalid input impossible
              type='text'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>{unit}</InputAdornment>
                ),
                inputProps: {
                  inputMode: 'numeric',
                },
              }}
              variant='filled'
            />
            <FormHelperText>{t(description)}</FormHelperText>
          </Box>
        ))}
      </form>
    )}
  </Form>
);

SafetySettingsFormPresentation.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

const SafetySettingsForm = connect(
  // mapStateToProps
  (state) => ({
    initialValues: {
      ...mapValues(getSafetySettings(state), (v) => (v ? String(v) : '')),
    },
  })
)(withTranslation()(SafetySettingsFormPresentation));

/**
 * Container of the tab that shows the form that the user can use to
 * edit the safety settings.
 */
const SafetySettingsTab = ({ onClose, onSubmit, t }) => (
  <>
    <DialogContent>
      <SafetySettingsForm onSubmit={onSubmit} />
    </DialogContent>
    <DialogActions>
      <Button form='safetySettings' type='submit' color='primary'>
        {t('general.action.save')}
      </Button>
      <Button onClick={onClose}>{t('general.action.close')}</Button>
    </DialogActions>
  </>
);

SafetySettingsTab.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

export default connect(
  // mapStateToProps
  null,
  // mapDispatchToProps
  {
    onSubmit: (data) => (dispatch) => {
      // `mapValues` doesn't work, because `react-final-form` drops empty values
      // dispatch(updateSafetySettings(mapValues(data, toNullOrNumber)));

      dispatch(
        updateSafetySettings({
          criticalBatteryVoltage: toNullOrNumber(data.criticalBatteryVoltage),
          lowBatteryVoltage: toNullOrNumber(data.lowBatteryVoltage),
          returnToHomeAltitude: toNullOrNumber(data.returnToHomeAltitude),
          returnToHomeSpeed: toNullOrNumber(data.returnToHomeSpeed),
        })
      );
    },
  }
)(withTranslation()(SafetySettingsTab));
