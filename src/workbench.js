/**
 * @file The main workbench object of the application that allows users
 * to arrange views in a flexible manner.
 *
 * This file contains a singleton instance of the workbench that is then
 * imported by the app. The app then binds the workbench to the central
 * workbench view and the sidebar.
 */

import debounce from 'lodash-es/debounce';
import React from 'react';
import { WorkbenchBuilder } from 'react-flexible-workbench';

import loadable from '@loadable/component';
import BackgroundHint from '@skybrush/mui-components/lib/BackgroundHint';

import { makeDetachable } from '~/features/detachable-panels/DetachablePanel';
import { saveWorkbenchState } from './features/workbench/slice';
import { injectFlockFromContext } from './flock';
import store from './store';
import { hasFeature } from './utils/configuration';
import views from './views';

const MapView = loadable(() =>
  import(/* webpackChunkName: "map" */ './views/map/MapView')
);

require('../assets/css/workbench.less');

/**
 * Dummy component that renders nothing.
 */
const Nothing = () => null;

/**
 * Fallback component to use in the workbench in case of errors.
 */
const FallbackComponent = () => (
  <BackgroundHint text='This component is not available in this version' />
);

/**
 * Helper function that returns the given value if and only if the given
 * feature is present in the configuration.
 */
const onlyWithFeature = (featureName, component) =>
  hasFeature(featureName) ? component : FallbackComponent;

/**
 * Registry that maps component types to be used in the top-level
 * GoldenLayout object to the corresponding React components.
 *
 * The React components will be created without any props. If you need the
 * components to have props, use a wrapper HOC.
 */

export const componentRegistry = {
  'beacon-list': {
    component: views.BeaconList,
    label: 'Beacons',
    detachable: true,
    feature: 'beacons',
  },
  'connection-list': {
    component: views.ConnectionList,
    label: 'Connections',
  },
  'dataset-list': {
    component: views.DatasetList,
    label: 'Datasets',
  },
  'dock-list': {
    component: views.DockList,
    label: 'Docks',
    feature: 'docks',
  },
  'feature-list': {
    component: views.FeatureList,
    label: 'Features',
    detachable: true,
    feature: 'features',
  },
  'ground-control-view': {
    component: injectFlockFromContext(views.GroundControlView),
    label: 'Ground control',
  },
  'layer-list': {
    component: views.LayerList,
    label: 'Layers',
    detachable: true,
  },
  'light-control': {
    component: views.LightControlPanel,
    label: 'Light control',
    detachable: true,
    feature: 'showControl',
  },
  'lcd-clock-panel': {
    component: views.LCDClockPanel,
    label: 'Clocks',
    detachable: true,
  },
  'log-panel': {
    component: views.LogPanel,
    label: 'Event log',
    detachable: true,
  },
  map: {
    component: MapView,
    label: 'Map',
  },
  messages: {
    component: views.MessagesPanelView, // deprecated, kept there for compatibility
    label: 'Messages',
  },
  placeholder: {
    component: Nothing,
    label: 'Placeholder',
  },
  'saved-location-list': {
    component: views.SavedLocationList,
    label: 'Locations',
    detachable: true,
  },
  'show-control': {
    component: views.ShowControlPanel,
    label: 'Show control',
    detachable: true,
    feature: 'showControl',
  },
  'three-d-view': {
    component: views.ThreeDTopLevelView,
    label: '3D View',
    feature: 'threeDView',
  },
  'uav-list': {
    component: injectFlockFromContext(views.UAVList),
    label: 'UAVs',
    detachable: true,
  },
};

function constructDefaultWorkbench(store) {
  const builder = new WorkbenchBuilder();

  // Register all our supported components in the builder
  for (const [name, entry] of Object.entries(componentRegistry)) {
    const featureModifier = (c) =>
      entry.feature ? onlyWithFeature(entry.feature, c) : c;
    const detachModifier = (c) =>
      entry.detachable ? makeDetachable(name, entry.label, c) : c;
    builder.registerComponent(
      name,
      featureModifier(detachModifier(entry.component))
    );
  }

  // prettier-ignore
  const workbench = builder
    .makeColumns()
      .makeStack()
        .add('map')
          .setTitle('Map')
          .setId('map')
        .add('uav-list')
          .setTitle('UAVs')
          .setId('uavs')
        .add('three-d-view')
          .setTitle('3D View')
          .setId('threeDView')
          .preventReorder()
        .finish()
      .makeRows()
        .makeStack()
          .add('lcd-clock-panel')
            .setTitle('Clocks')
            .setId('clocks')
          .add('saved-location-list')
            .setTitle('Locations')
            .setId('locations')
          .add('layer-list')
            .setTitle('Layers')
            .setId('layers')
          .finish()
          .setRelativeHeight(25)
        .makeStack()
          .add('show-control')
            .setTitle('Show control')
            .setId('show')
          .add('light-control')
            .setTitle('Light control')
            .setId('lights')
          .finish()
        .finish()
        .setRelativeWidth(25)
      .finish()
    .build();

  // Set a fallback component for cases when we cannot show a component
  workbench.fallback = FallbackComponent;

  // Wire the workbench to the store so the store is updated when
  // the workbench state changes
  workbench.on(
    'stateChanged',
    debounce(() => {
      store.dispatch(saveWorkbenchState(workbench));
    }, 1000)
  );

  return workbench;
}

const workbench = constructDefaultWorkbench(store);

/**
 * React context that exposes the workbench instance to components.
 */
export const Workbench = React.createContext(workbench);

export default workbench;
