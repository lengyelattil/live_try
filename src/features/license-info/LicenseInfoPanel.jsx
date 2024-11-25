import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAsyncRetry } from 'react-use';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Gift from '@material-ui/icons/CardGiftcard';
import Error from '@material-ui/icons/Error';
import Event from '@material-ui/icons/Event';
import Lock from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person';
import VpnKey from '@material-ui/icons/VpnKey';

import BackgroundHint from '@skybrush/mui-components/lib/BackgroundHint';
import LargeProgressIndicator from '@skybrush/mui-components/lib/LargeProgressIndicator';

import useMessageHub from '~/hooks/useMessageHub';

const LicenseInfoPanelPresentation = ({
  expiryDate,
  features,
  id,
  licensee,
  restrictions,
}) => {
  const featureItems = [];
  const restrictionItems = [];
  const { t } = useTranslation();

  if (Array.isArray(features)) {
    for (const feature of features) {
      featureItems.push(
        <ListItem key={`${feature.type}_${feature.label}`} disableGutters>
          <ListItemIcon>
            <Gift />
          </ListItemIcon>
          <ListItemText
            primary={feature.label}
            secondary={feature.secondaryLabel}
          />
        </ListItem>
      );
    }
  }

  if (Array.isArray(restrictions)) {
    for (const restriction of restrictions) {
      restrictionItems.push(
        <ListItem
          key={`${restriction.type}_${restriction.label}`}
          disableGutters
        >
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText
            primary={restriction.label}
            secondary={restriction.secondaryLabel}
          />
        </ListItem>
      );
    }
  }

  return (
    <List dense disablePadding>
      <ListItem disableGutters>
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText
          primary={t('licenseInfoPanel.licenseID')}
          secondary={id || t('licenseInfoPanel.noLicenseActivated')}
        />
      </ListItem>
      {licensee && (
        <ListItem disableGutters>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText
            primary={t('licenseInfoPanel.nameOfLicenseHolder')}
            secondary={licensee}
          />
        </ListItem>
      )}
      {id && (
        <ListItem disableGutters>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText
            primary={t('licenseInfoPanel.expiryDate')}
            secondary={expiryDate || t('licenseInfoPanel.licenseNeverExpires')}
          />
        </ListItem>
      )}
      {featureItems.length > 0 && <Divider />}
      {featureItems}
      {restrictionItems.length > 0 && <Divider />}
      {restrictionItems}
    </List>
  );
};

LicenseInfoPanelPresentation.propTypes = {
  id: PropTypes.string,
  licensee: PropTypes.string,
  expiryDate: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string,
      secondaryLabel: PropTypes.string,
    })
  ),
  restrictions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string,
      secondaryLabel: PropTypes.string,
    })
  ),
};

const LicenseInfoPanel = () => {
  const messageHub = useMessageHub();
  const state = useAsyncRetry(messageHub.query.getLicenseInformation, [
    messageHub,
  ]);
  const { t } = useTranslation();

  if (state.error && !state.loading) {
    return (
      <BackgroundHint
        icon={<Error />}
        text={t('licenseInfoPanel.errorWhileLoadingLicenseInformation')}
        button={
          <Button onClick={state.retry}>
            {t('licenseInfoPanel.tryAgain')}
          </Button>
        }
      />
    );
  }

  if (state.value) {
    return <LicenseInfoPanelPresentation {...state.value} />;
  }

  return (
    <LargeProgressIndicator
      fullHeight
      label={t('licenseInfoPanel.retrievingLicenseInformation')}
    />
  );
};

export default LicenseInfoPanel;
