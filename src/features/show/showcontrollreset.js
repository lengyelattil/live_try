import {
    resetOutdoorShowOrigin,
    setOutdoorShowOrientation,
  } from './slice';

  /**
 * Rotates the show origin by the given angle in degrees around a given point,
 * snapping the angle to one decimal digit.
 */
export const rotateOutdoorShowOrientationByAngleAroundPoint =
(angle, rotationOriginInMapCoordinates) => (dispatch, getState) => {
  const showOriginInMapCoordinates = mapViewCoordinateFromLonLat(
    getOutdoorShowOrigin(getState())
  );
  const showOriginPoint = new Point(showOriginInMapCoordinates);
  showOriginPoint.rotate(toRadians(-angle), rotationOriginInMapCoordinates);
  const newOrigin = lonLatFromMapViewCoordinate(
    showOriginPoint.flatCoordinates
  );

  dispatch(resetOutdoorShowOrigin(newOrigin));
  dispatch(rotateOutdoorShowOrientationByAngle(angle));
};