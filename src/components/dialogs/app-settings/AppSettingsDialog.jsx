import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tab from '@material-ui/core/Tab';

import DialogTabs from '../DialogTabs';

import DisplayTab from './DisplayTab';
import ServerTab from './ServerTab';
import ThreeDViewTab from './ThreeDViewTab';
import UAVsTab from './UAVsTab';

import {
  closeAppSettingsDialog,
  setAppSettingsDialogTab
} from '~/actions/app-settings';

/* ===================================================================== */

const tabNameToComponent = {
  display: <DisplayTab />,
  threeD: <ThreeDViewTab />,
  server: <ServerTab />,
  uavs: <UAVsTab />
};

/**
 * Presentation component for the dialog that shows the form that the user
 * can use to edit the app settings.
 */
const AppSettingsDialogPresentation = ({
  onClose,
  onTabSelected,
  open,
  selectedTab
}) => (
  <Dialog fullWidth open={open} maxWidth="sm" onClose={onClose}>
    <DialogTabs value={selectedTab} onChange={onTabSelected}>
      <Tab value="display" label="Display" />
      <Tab value="threeD" label="3D View" />
      <Tab value="uavs" label="UAVs" />
      {window.isElectron ? <Tab value="server" label="Server" /> : null}
    </DialogTabs>
    <DialogContent style={{ minHeight: 200 }}>
      {tabNameToComponent[selectedTab]}
    </DialogContent>
  </Dialog>
);

AppSettingsDialogPresentation.propTypes = {
  onClose: PropTypes.func,
  onTabSelected: PropTypes.func,
  open: PropTypes.bool,
  selectedTab: PropTypes.string
};

AppSettingsDialogPresentation.defaultProps = {
  open: false,
  selectedTab: 'auto'
};

/**
 * Container of the dialog that shows the form that the user can use to
 * edit the server settings.
 */
const AppSettingsDialog = connect(
  // mapStateToProps
  (state) => state.dialogs.appSettings,
  // mapDispatchToProps
  (dispatch) => ({
    onClose() {
      dispatch(closeAppSettingsDialog());
    },
    onTabSelected(event, value) {
      dispatch(setAppSettingsDialogTab(value));
    }
  })
)(AppSettingsDialogPresentation);

export default AppSettingsDialog;
