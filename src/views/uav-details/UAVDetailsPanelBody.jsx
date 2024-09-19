import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import BackgroundHint from '@skybrush/mui-components/lib/BackgroundHint';

import MessagesPanel from '~/components/chat/MessagesPanel';
import UAVLogsPanel from '~/features/uavs/UAVLogsPanel';
import PreflightStatusPanel from '~/features/uavs/PreflightStatusPanel';
import RangefinderPanel from '~/features/uavs/RangefinderPanel';
import {
  getSelectedTabInUAVDetailsPanel,
  getSelectedUAVIdInUAVDetailsPanel,
} from '~/features/uavs/selectors';
import UAVTestsPanel from '~/features/uavs/UAVTestsPanel';

export const views = {
  'UAVDetailsPanelBody.preflight': PreflightStatusPanel,
  'UAVDetailsPanelBody.tests': UAVTestsPanel,
  'UAVDetailsPanelBody.messages': MessagesPanel,
  'UAVDetailsPanelBody.logs': UAVLogsPanel,
  'UAVDetailsPanelBody.rangefinder': RangefinderPanel,
};

// prettier-ignore
const UAVDetailsPanelBody = ({ selectedTab, t, uavId }) =>
  !uavId                  ? <BackgroundHint text={t('UAVDetailsPanelBody.selectUAVId')} />  :
  !(selectedTab in views) ? <BackgroundHint text={t('UAVDetailsPanelBody.selectView')}   />  :
  ((SelectedView)        => <SelectedView uavId={uavId} />)(views[selectedTab]);

UAVDetailsPanelBody.propTypes = {
  selectedTab: PropTypes.oneOf(Object.keys(views)),
  t: PropTypes.func,
  uavId: PropTypes.string,
};

export default connect(
  // mapStateToProps
  (state) => ({
    selectedTab: getSelectedTabInUAVDetailsPanel(state),
    uavId: getSelectedUAVIdInUAVDetailsPanel(state),
  })
)(withTranslation()(UAVDetailsPanelBody));
