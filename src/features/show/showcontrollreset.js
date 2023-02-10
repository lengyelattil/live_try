import {
    resetOutdoorShowOrigin,
    setOutdoorShowOrientation,
  } from './slice';

  /**
 * Rotates the show origin by the given angle in degrees around a given point,
 * snapping the angle to one decimal digit.
 */
export const resetEnvironmentSettings =
(angle) => (dispatch) => {
  dispatch(resetOutdoorShowOrigin(newOrigin));
  dispatch(setOutdoorShowOrientation(action));
  dispatch(rotateOutdoorShowOrientationByAngle(angle));
};