export type MapSelectorProps = {
  onSelect: (lat: number, lng: number) => void;
  data?: [number, number] | null
};