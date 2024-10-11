import { type Feature, type LabelStyle } from '~/model/features';
import { type Identifier } from '~/utils/collections';

export enum FeatureEditorDialogTab {
  GENERAL = 'general',
  ATTRIBUTES = 'attributes',
  POINTS = 'points',
}

export const featureEditorDialogTabs = [
  FeatureEditorDialogTab.GENERAL,
  FeatureEditorDialogTab.ATTRIBUTES,
  // FeatureEditorDialogTab.POINTS,
];

export const labelForFeatureEditorDialogTab: Record<
  FeatureEditorDialogTab,
  string
> = {
  [FeatureEditorDialogTab.GENERAL]: 'featureEditorDialogTab.general',
  [FeatureEditorDialogTab.ATTRIBUTES]: 'featureEditorDialogTab.attributes',
  [FeatureEditorDialogTab.POINTS]: 'featureEditorDialogTab.points',
};

export type FeatureProperties = {
  attributes?: Record<string, unknown>;
  color?: string;
  filled?: boolean;
  id: Identifier;
  label?: string;
  labelStyle?: LabelStyle;
  measure?: boolean;
  showPoints?: boolean;
  visible: boolean;
};

export type FeatureWithProperties = Feature & FeatureProperties;
