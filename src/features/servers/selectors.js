import { createSelector } from '@reduxjs/toolkit';

import { INVALID } from './slice';
import { ConnectionState } from '~/model/connections';
import { selectOrdered } from '~/utils/collections';

/**
 * Returns all the information that we know about the current Skybrush server.
 *
 * @param  {Object}  state  the state of the application
 * @return {Object} all the information that we know about the current Skybrush
 *     server, directly from the state object
 */
const getCurrentServerState = state => state.servers.current;

/**
 * Returns the list of features that we know are supported by the current
 * Skybrush server.
 *
 * @param  {Object}  state  the state of the application
 * @return {Object[]}  an object mapping names of features supported by the
 *     current Skybrush server to any additional information we know about the
 *     feature.
 */
const getCurrentServerFeatures = state => state.servers.current.features;

/**
 * Selector that calculates and caches the list of all the servers detected
 * on the local network, in exactly the same order as they should appear on
 * the UI.
 */
export const getDetectedServersInOrder = createSelector(
  state => state.servers.detected,
  selectOrdered
);

/**
 * Returns all the information that we currently know about the authentication
 * methods supported by the current server.
 */
const getAuthenticationSettings = createSelector(
  getCurrentServerState,
  current =>
    current.state === ConnectionState.CONNECTED
      ? current.authentication
      : INVALID
);

/**
 * Returns the name of the user that is currently authenticated to the server.
 */
export const getAuthenticatedUser = createSelector(
  getAuthenticationSettings,
  settings => settings.user
);

/**
 * Returns whether we have valid and up-to-date information about the
 * authentication methods supported by the server we are currently connected
 * to.
 */
export const areServerAuthenticationSettingsValid = createSelector(
  getAuthenticationSettings,
  settings => settings.valid
);

/**
 * Returns whether the user is currently authenticated to the remote
 * Skybrush server.
 */
export const isAuthenticated = createSelector(
  getAuthenticatedUser,
  user => Boolean(user)
);

/**
 * Returns whether the user is currently attempting to authenticate to the
 * remote Skybrush server.
 *
 * @param  {Object}  state  the state of the application
 * @return {boolean} whether there is an authentication attempt in progress
 */
export const isAuthenticating = state => state.servers.isAuthenticating;

/**
 * Returns whether we are connected to the remote Skybrush server.
 */
export const isConnected = createSelector(
  getCurrentServerState,
  current => current.state === ConnectionState.CONNECTED
);

/**
 * Returns whether the server supports at least one authentication method.
 */
export const supportsAuthentication = createSelector(
  getAuthenticationSettings,
  settings => settings.methods && settings.methods.length > 0
);

/**
 * Creates a selector that returns whether the server supports the feature with
 * the given name.
 */
const makeSupportsFeatureSelector = name =>
  createSelector(
    getCurrentServerFeatures,
    features => features[name] !== undefined
  );

/**
 * Returns whehther the server we are connected to supports virtual drones.
 */
export const supportsVirtualDrones = makeSupportsFeatureSelector(
  'virtual_uavs'
);

/**
 * Returns whether the server requires the user to authenticate before
 * doing anything.
 */
export const requiresAuthentication = createSelector(
  getAuthenticationSettings,
  settings => settings.required
);
