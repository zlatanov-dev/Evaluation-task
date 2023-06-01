// Type for Structure
export type Position = {
  x: number;
  y: number;
  content?: JSX.Element;
};

type Hotspots = {
  id: string;
  floor_id: string;
  name: string;
  position: Position;
};

export type Structure = {
  id: string;
  name: string;
  floor_plan: string;
  hotspots: Hotspots[];
};

// type for Tour Configurations

export type TourConfigurations = {
  id: string;
  name: string;
  description: string;
  options: object;
  shareable: boolean;
  opening_view: object;
  structure: Structure[];
  proprety_name: string
  heartbeat: boolean;
}

// Type for Hotspot
type Assets = {
  thumbnail: string;
  standard: string;
  hd: string;
}

export type HotspotType = {
  id: string;
  name: string;
  assets: Assets;
  risk_status: string;
  floor_id: string;
  hotspot_id: string;
  meta: object;
  marker_tokens: string
  attached_to: string | null;
};