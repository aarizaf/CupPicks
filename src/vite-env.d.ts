/// <reference types="vite/client" />

declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties, MouseEvent, ReactNode } from 'react';

  interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;

  export interface GeoFeature {
    rsmKey: string;
    id: string | number;
    type: string;
    properties: Record<string, string | number>;
    geometry: object;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: GeoFeature[] }) => ReactNode;
  }

  export const Geographies: ComponentType<GeographiesProps>;

  interface GeographyStyle {
    default?: CSSProperties;
    hover?: CSSProperties;
    pressed?: CSSProperties;
  }

  interface GeographyProps {
    geography: GeoFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: GeographyStyle;
    tabIndex?: number;
    onMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
    onClick?: (event: MouseEvent<SVGPathElement>) => void;
  }

  export const Geography: ComponentType<GeographyProps>;

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
  }

  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
