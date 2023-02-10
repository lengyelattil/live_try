import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { getSetupStageStatuses } from '~/features/show/stages';
import Colors from '~/components/colors';

/**
 * Button that allows the user to express her explicit consent to starting the
 * drone show. Such an authorization is needed even if the show is set to start
 * in automatic mode.
 */
const ResetButton = ({ onClick }) => {
  // <ListItem>
  //   <ListItemText
  //     disableTypography
  //     primary={
  //       <Typography variant='button'>'Reset the show settings'</Typography>
  //     }
  //   />
  // </ListItem>
  return (
    <Button style={{ color: Colors.error }} onClick={onClick}>
      reset checklist
    </Button>
  );
};

ResetButton.propTypes = {
  onClick: PropTypes.func,
}

export default connect(
  // mapStateToProps
  null,
  // mapDispatchToProps
  {
    onClick: () => (dispatch, getState) => {
      console.log('sajt' + Math.random());

      // const state = getState();

      // dispatch(resetOutdoorShowOrigin(newOrigin));
      // dispatch(setOutdoorShowOrientation(action));
      // dispatch(rotateOutdoorShowOrientationByAngle(angle));
    },
  }
)(ResetButton);
