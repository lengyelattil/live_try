import { Checkboxes, TextField } from 'mui-rff';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

import BackgroundHint from '@skybrush/mui-components/lib/BackgroundHint';

import Fence from '~/icons/PlacesFence';

import { updateFeatureAttributes } from '~/features/map-features/slice';
import { getGeofencePolygonId } from '~/features/mission/selectors';
import { clearGeofencePolygonId } from '~/features/mission/slice';
import { FeatureType } from '~/model/features';
import { createValidator, optional, positive } from '~/utils/validation';

// PERF: Optimize this, it has lots of unnecessary recomputes
const FeatureAttributesForm = ({
  clearGeofencePolygonId,
  feature,
  isGeofence,
  onSetFeatureAttributes,
  t,
}) => {
  switch (feature.type) {
    case FeatureType.POLYGON: {
      if (isGeofence) {
        return (
          <BackgroundHint
            icon={<Fence />}
            header={t('featureAttributesForm.currentGeofence')}
            text={t('featureAttributesForm.currentGeofenceText')}
            button={
              <Button onClick={clearGeofencePolygonId}>
                {t('general.action.clear')}
              </Button>
            }
          />
        );
      }

      return (
        <Form
          initialValues={feature.attributes}
          validate={createValidator({
            minAltitude: optional(positive),
            maxAltitude: optional(positive),
          })}
          onSubmit={({ isExclusionZone, minAltitude, maxAltitude }) => {
            onSetFeatureAttributes({
              isExclusionZone,
              minAltitude: Number(minAltitude) || undefined,
              maxAltitude: Number(maxAltitude) || undefined,
            });
          }}
        >
          {({ form, values }) => (
            <div>
              <Checkboxes
                name='isExclusionZone'
                data={{ label: t('featureAttributesForm.exclusionZone') }}
              />
              <FormHelperText style={{ marginTop: -8, marginBottom: 8 }}>
                {t('featureAttributesForm.exclusionZoneText')}
              </FormHelperText>

              <TextField
                name='minAltitude'
                label={t('featureAttributesForm.minAGLAlttitude')}
                disabled={!values.isExclusionZone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>m</InputAdornment>
                  ),
                  inputProps: {
                    inputMode: 'numeric',
                  },
                }}
              />
              <FormHelperText style={{ marginBottom: 8 }}>
                {t('featureAttributesForm.minAGLAlttitudeText')}
              </FormHelperText>

              <TextField
                name='maxAltitude'
                label={t('featureAttributesForm.maxAGLAlttitude')}
                disabled={!values.isExclusionZone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>m</InputAdornment>
                  ),
                  inputProps: {
                    inputMode: 'numeric',
                  },
                }}
              />
              <FormHelperText style={{ marginBottom: 8 }}>
                {t('featureAttributesForm.maxAGLAlttitudeText')}
              </FormHelperText>

              {/* HACK: Forms are not meant to be used like this... */}
              <FormSpy
                subscription={{ values: true }}
                onChange={() => form.submit()}
              />
            </div>
          )}
        </Form>
      );
    }

    default: {
      return (
        <BackgroundHint
          text={t('featureAttributesForm.doesNotSupportAttributes')}
        />
      );
    }
  }
};

FeatureAttributesForm.propTypes = {
  clearGeofencePolygonId: PropTypes.func,
  feature: PropTypes.object.isRequired,
  isGeofence: PropTypes.bool,
  onSetFeatureAttributes: PropTypes.func,
  t: PropTypes.func,
};

export default connect(
  // mapStateToProps
  (state, { featureId }) => ({
    isGeofence: getGeofencePolygonId(state) === featureId,
  }),
  // mapDispatchToProps
  (dispatch, { featureId }) => ({
    clearGeofencePolygonId: () => dispatch(clearGeofencePolygonId()),
    onSetFeatureAttributes(attributes) {
      dispatch(updateFeatureAttributes({ id: featureId, attributes }));
    },
  })
)(withTranslation()(FeatureAttributesForm));
