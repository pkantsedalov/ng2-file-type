export interface MinFileSizeRestriction {
  min: number;
}

export interface MaxFileSizeRestriction {
  max: number;
}

export interface RangeFileSizeRestrictions {
  min: number;
  max: number;
}

export type FileSizeRestrictions = MinFileSizeRestriction | MaxFileSizeRestriction | RangeFileSizeRestrictions;

export function isMinFileSizeRestrictions(value: any): value is MinFileSizeRestriction {
  return value.hasOwnProperty('min');
}

export function isMaxFileSizeRestrictions(value: any): value is MaxFileSizeRestriction {
  return value.hasOwnProperty('max');
}

export function isRangeFileSizeRestrictions(value: any): value is RangeFileSizeRestrictions {
  return value.hasOwnProperty('min') && value.hasOwnProperty('max');
}
