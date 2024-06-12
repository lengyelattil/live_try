/**
 * Enum describing the possible geofence actions.
 */
export enum GeofenceAction {
  KEEP_CURRENT = 'keepCurrent',
  REPORT = 'report',
  LAND = 'land',
  RETURN = 'return',
  SMART_LAND = 'smartLand',
  SMART_RETURN = 'smartReturn',
  STOP = 'stop',
  SHUT_DOWN = 'shutDown',
}

const VALID_GEOFENCE_ACTIONS = Object.values(GeofenceAction);

const geofenceActionDescriptions: Record<GeofenceAction, string> = {
  [GeofenceAction.KEEP_CURRENT]: 'geofenceAction.keepCurrent',
  [GeofenceAction.REPORT]: 'geofenceAction.report',
  [GeofenceAction.LAND]: 'general.commands.land',
  [GeofenceAction.RETURN]: 'general.commands.returnToHome',
  [GeofenceAction.SMART_LAND]: 'geofenceAction.smartLand',
  [GeofenceAction.SMART_RETURN]: 'geofenceAction.smartReturn',
  [GeofenceAction.STOP]: 'geofenceAction.stop',
  [GeofenceAction.SHUT_DOWN]: 'geofenceAction.shutDown',
};

/**
 * Returns a human-readable description of the given geofence action.
 */
export function describeGeofenceAction(action: GeofenceAction): string {
  return geofenceActionDescriptions[action] || `unknown action: ${action}`;
}

/**
 * Returns whether the given input represents a valid geofence action.
 */
export function isValidGeofenceAction(action: GeofenceAction): boolean {
  return VALID_GEOFENCE_ACTIONS.includes(action);
}
