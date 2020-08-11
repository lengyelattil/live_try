import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import StatusLight from '~/components/StatusLight';
import { Status } from '~/components/semantics';

import { showGeofenceSettingsDialog } from '~/actions/geofence-settings';
import { getSetupStageStatuses } from '~/features/show/stages';

const formatStatusText = (status) => {
  switch (status) {
    case Status.OFF:
    case Status.NEXT:
      return 'Define a geofence to restrict the flight area';

    case Status.SUCCESS:
      return 'Automatically generated geofence assigned';

    case Status.WARNING:
      return 'Manual geofence in use';

    default:
      return '';
  }
};

/**
 * Component with a button that shows a dialog that allows the user to create an
 * automatic geofence for the loaded show. The dialog also allows the user to
 * set parameters for the generation such as safety margin width and polygon
 * simplification.
 */
const GeofenceButton = ({ onClick, status, ...rest }) => {
  return (
    <ListItem
      button
      disabled={status === Status.OFF}
      onClick={onClick}
      {...rest}
    >
      <StatusLight status={status} />
      <ListItemText
        primary='Setup geofence'
        secondary={formatStatusText(status)}
      />
    </ListItem>
  );
};

GeofenceButton.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.oneOf(Object.values(Status)),
};

GeofenceButton.defaultProps = {};

export default connect(
  // mapStateToProps
  (state) => ({
    status: getSetupStageStatuses(state).setupGeofence,
  }),
  // mapDispatchToProps
  {
    onClick: showGeofenceSettingsDialog,
  }
)(GeofenceButton);
